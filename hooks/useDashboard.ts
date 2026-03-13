import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getGrievancesAction,
  deleteGrievanceAction,
} from '@/lib/server-actions/grievance';
import { Grievance, GrievanceStatus } from '@/types/grievance';
import { storage } from '@/lib/storage';
import { GRIEVANCE_STATUS } from '@/lib/constants';

export function useDashboard() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<GrievanceStatus | 'All'>(
    'All',
  );
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [serverData, localData] = await Promise.all([
        getGrievancesAction(),
        storage.getAll(),
      ]);

      // Merge: local first, server overwrites by ID
      const mergedMap = new Map<string, Grievance>();
      localData.forEach((g) => mergedMap.set(g.id, g));
      serverData.forEach((g) => mergedMap.set(g.id, g));

      const mergedList = Array.from(mergedMap.values()).sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );

      setGrievances(mergedList);
    } catch (error) {
      console.error('Failed to fetch grievances', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    try {
      await deleteGrievanceAction(id);
      await storage.delete(id);
      await fetchData();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete grievance', error);
    }
  };

  const clearDeleteConfirm = () => setDeleteConfirm(null);
  const initiateDelete = (id: string) => setDeleteConfirm(id);

  const stats = useMemo(
    () => ({
      total: grievances.length,
      submitted: grievances.filter(
        (g) => g.status === GRIEVANCE_STATUS.SUBMITTED,
      ).length,
      drafts: grievances.filter((g) => g.status === GRIEVANCE_STATUS.DRAFT)
        .length,
    }),
    [grievances],
  );

  const filteredGrievances = useMemo(() => {
    return grievances.filter((g) => {
      const term = searchTerm.toLowerCase();

      const title = g.incident?.title || '';
      const name = g.reporter?.name || '';
      const employeeId = g.reporter?.employeeId || '';

      const matchesSearch =
        title.toLowerCase().includes(term) ||
        name.toLowerCase().includes(term) ||
        employeeId.toLowerCase().includes(term);

      const matchesStatus = statusFilter === 'All' || g.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [grievances, searchTerm, statusFilter]);

  const paginatedGrievances = useMemo(() => {
    return filteredGrievances.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [filteredGrievances, page, rowsPerPage]);

  return {
    state: {
      grievances,
      loading,
      page,
      rowsPerPage,
      searchTerm,
      statusFilter,
      deleteConfirm,
    },
    computed: {
      stats,
      filteredGrievances,
      paginatedGrievances,
      totalCount: filteredGrievances.length,
    },
    handlers: {
      setPage,
      setRowsPerPage,
      setSearchTerm,
      setStatusFilter,
      handleDelete,
      initiateDelete,
      clearDeleteConfirm,
      refreshData: fetchData,
    },
  };
}
