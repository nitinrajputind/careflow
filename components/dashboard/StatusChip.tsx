'use client';

import React from 'react';
import { Chip, alpha } from '@mui/material';
import { GrievanceStatus } from '@/types/grievance';

interface StatusChipProps {
  status: GrievanceStatus;
}

export const StatusChip = ({ status }: StatusChipProps) => {
  const getColor = () => {
    switch (status) {
      case 'Submitted':
        return {
          bg: alpha('#10B981', 0.1),
          text: '#059669',
          border: alpha('#10B981', 0.2),
        };
      case 'Draft':
        return {
          bg: alpha('#64748B', 0.1),
          text: '#475569',
          border: alpha('#64748B', 0.2),
        };
      default:
        return {
          bg: alpha('#94A3B8', 0.1),
          text: '#64748B',
          border: alpha('#94A3B8', 0.2),
        };
    }
  };

  const colors = getColor();

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: colors.bg,
        color: colors.text,
        fontWeight: 600,
        fontSize: '0.7rem',
        border: `1px solid ${colors.border}`,
      }}
    />
  );
};
