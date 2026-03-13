import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  Visibility as EyeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Grievance } from '@/types/grievance';
import { StatusChip } from '@/components/dashboard/StatusChip';
import { ActionMenu } from '@/components/ui/ActionMenu';
import { format } from 'date-fns';

export interface GrievanceTableProps {
  grievances: Grievance[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDeleteRequest: (id: string) => void;
}

export const GrievanceTable: React.FC<GrievanceTableProps> = ({
  grievances,
  loading,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onViewDetails,
  onEdit,
  onDeleteRequest,
}) => {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Created Date
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, color: 'text.secondary' }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={32} />
                </TableCell>
              </TableRow>
            ) : grievances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No results match your search.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              grievances.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    '&:last-child td': { borderBottom: 0 },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: 'rgba(15, 23, 42, 0.04)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontFamily: 'monospace',
                        color: 'text.secondary',
                      }}
                    >
                      {row.id.split('-')[0]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {row.incident?.title || 'Untitled'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {row.reporter?.name || 'Unknown Reporter'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 4,
                        px: 1.5,
                        py: 0.25,
                      }}
                    >
                      {row.incident?.type || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusChip status={row.status} />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {format(new Date(row.createdAt), 'MMM d, yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <ActionMenu
                        actions={[
                          {
                            label: 'View Details',
                            icon: <EyeIcon fontSize="small" />,
                            onClick: () => onViewDetails(row.id),
                            color: 'info',
                          },
                          {
                            label: 'Edit',
                            icon: <EditIcon fontSize="small" />,
                            onClick: () => onEdit(row.id),
                            color: 'primary',
                          },
                          {
                            label: 'Delete',
                            icon: <DeleteIcon fontSize="small" />,
                            onClick: () => onDeleteRequest(row.id),
                            color: 'error',
                          },
                        ]}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, p) => onPageChange(p)}
        onRowsPerPageChange={(e) => {
          onRowsPerPageChange(parseInt(e.target.value, 10));
          onPageChange(0);
        }}
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows':
            {
              mt: 0,
              mb: 0,
            },
        }}
      />
    </>
  );
};
