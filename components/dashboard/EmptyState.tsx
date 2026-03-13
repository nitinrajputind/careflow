'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NoteAdd as NoteAddIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export const EmptyState = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 4,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: 'rgba(15, 23, 42, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <NoteAddIcon sx={{ fontSize: 40, color: '#94A3B8' }} />
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}
      >
        No reports yet
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 320 }}
      >
        Start your first grievance report. All reports will appear here once
        created.
      </Typography>
      <Button
        variant="contained"
        startIcon={<NoteAddIcon />}
        onClick={() => router.push('/grievance/create')}
      >
        Create First Report
      </Button>
    </Box>
  );
};
