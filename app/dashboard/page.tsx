'use client';

import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as PlusIcon,
  ReportProblem as AlertIcon,
  CheckCircle as SuccessIcon,
  Description as DraftIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { STAT_CARD_CONFIG } from '@/lib/constants';
import { StatCard } from '@/components/dashboard/StatCard';
import { DashboardToolbar } from '@/components/dashboard/DashboardToolbar';
import { GrievanceTable } from '@/components/dashboard/GrievanceTable';
import { useDashboard } from '@/hooks/useDashboard';

// ─── Stat Icons ──────────────────────────────────────────────────────
const STAT_ICONS: Record<string, React.ReactElement> = {
  total: <AlertIcon />,
  submitted: <SuccessIcon />,
  drafts: <DraftIcon />,
};

export default function DashboardPage() {
  const router = useRouter();
  const { state, computed, handlers } = useDashboard();

  const {
    loading,
    page,
    rowsPerPage,
    searchTerm,
    statusFilter,
    deleteConfirm,
    grievances,
  } = state;
  const { stats, paginatedGrievances, totalCount } = computed;
  const {
    setPage,
    setRowsPerPage,
    setSearchTerm,
    setStatusFilter,
    handleDelete,
    initiateDelete,
    clearDeleteConfirm,
  } = handlers;

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Grievance Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlusIcon sx={{ fontSize: 18 }} />}
            onClick={() => router.push('/grievance/create')}
          >
            New Grievance
          </Button>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {STAT_CARD_CONFIG.map((stat, idx) => (
            <Grid key={stat.key} size={{ xs: 12, sm: 4 }}>
              <StatCard
                label={stat.label}
                value={stats[stat.key as keyof typeof stats] as number}
                icon={STAT_ICONS[stat.key]}
                bg={stat.bg}
                color={stat.color}
                delay={idx * 0.15}
              />
            </Grid>
          ))}
        </Grid>

        {/* Table Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            mb: 4,
            borderRadius: '16px',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}
        >
          <DashboardToolbar
            searchTerm={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setPage(0);
            }}
            statusFilter={statusFilter}
            onStatusChange={(status) => {
              setStatusFilter(status);
              setPage(0);
            }}
          />

          {!loading && grievances.length === 0 ? (
            <EmptyState />
          ) : (
            <GrievanceTable
              grievances={paginatedGrievances}
              loading={loading}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={totalCount}
              onPageChange={(p) => setPage(p)}
              onRowsPerPageChange={(r) => setRowsPerPage(r)}
              onViewDetails={(id) =>
                router.push(`/grievance/create?edit=${id}&view=true`)
              }
              onEdit={(id) => router.push(`/grievance/create?edit=${id}`)}
              onDeleteRequest={(id) => initiateDelete(id)}
            />
          )}
        </Paper>

        {/* Delete Confirmation */}
        <Snackbar
          open={!!deleteConfirm}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity="warning"
            variant="filled"
            action={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  size="small"
                  onClick={clearDeleteConfirm}
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                >
                  Delete
                </Button>
              </Box>
            }
          >
            Are you sure you want to delete this grievance?
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
