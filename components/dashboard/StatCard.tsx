import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { motion } from 'motion/react';

export interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
  color: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  bg,
  color,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          border: '1px solid',
          borderColor: 'divider',
          background: 'white',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
            borderColor: 'primary.light',
          },
        }}
      >
        {/* Decorative subtle background blob */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: bg,
            opacity: 0.4,
            filter: 'blur(24px)',
          }}
        />

        <Box
          sx={{
            p: 2,
            bgcolor: bg,
            color: color,
            borderRadius: '12px',
            display: 'flex',
            boxShadow: `0 8px 16px -8px ${color}`,
            zIndex: 1,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              mb: 0.5,
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            {label}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};
