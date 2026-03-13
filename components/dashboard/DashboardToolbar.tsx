import React from 'react';
import { Box, TextField, InputAdornment, MenuItem } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { GrievanceStatus } from '@/types/grievance';

export interface DashboardToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: GrievanceStatus | 'All';
  onStatusChange: (status: GrievanceStatus | 'All') => void;
}

export const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        mb: 3,
        flexWrap: 'wrap',
        p: 2,
        borderRadius: 3,
        bgcolor: 'rgba(248, 250, 252, 0.5)',
        border: '1px solid',
        borderColor: 'divider',
        alignItems: 'center',
      }}
    >
      <TextField
        placeholder="Search by title, name or employee ID..."
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          flexGrow: 1,
          minWidth: '280px',
          '& .MuiOutlinedInput-root': {
            bgcolor: 'common.white',
            borderRadius: 2,
            transition: 'all 0.2s ease',
            '&.Mui-focused': {
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        size="small"
        value={statusFilter}
        onChange={(e) =>
          onStatusChange(e.target.value as GrievanceStatus | 'All')
        }
        sx={{
          minWidth: '180px',
          '& .MuiOutlinedInput-root': {
            bgcolor: 'common.white',
            borderRadius: 2,
            transition: 'all 0.2s ease',
            '&.Mui-focused': {
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
            },
          },
        }}
      >
        <MenuItem value="All" sx={{ fontWeight: 500 }}>
          All Statuses
        </MenuItem>
        <MenuItem value="Draft" sx={{ fontWeight: 500 }}>
          Draft
        </MenuItem>
        <MenuItem value="Submitted" sx={{ fontWeight: 500 }}>
          Submitted
        </MenuItem>
      </TextField>
    </Box>
  );
};
