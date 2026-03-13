'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Home as HomeIcon,
  BugReport as BugIcon,
  ExpandMore as ExpandIcon,
} from '@mui/icons-material';
import { motion } from 'motion/react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFF1F2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            {/* Animated icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '24px',
                  background:
                    'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(245,158,11,0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  boxShadow: '0 8px 32px rgba(239, 68, 68, 0.1)',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <BugIcon sx={{ fontSize: 48, color: '#EF4444' }} />
                </motion.div>
              </Box>
            </motion.div>

            {/* Error message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 2, color: '#0F172A' }}
              >
                Something went wrong
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#64748B',
                  maxWidth: 420,
                  mx: 'auto',
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                An unexpected error occurred while processing your request.
                Don&apos;t worry — your data is safe. Please try again.
              </Typography>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RefreshIcon />}
                  onClick={reset}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    background:
                      'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(15, 23, 42, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Try Again
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={() => (window.location.href = '/')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: '#CBD5E1',
                    color: '#475569',
                    '&:hover': {
                      borderColor: '#94A3B8',
                      bgcolor: 'rgba(0,0,0,0.02)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Go Home
                </Button>
              </Stack>
            </motion.div>

            {/* Error Details (Collapsible) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="small"
                onClick={() => setShowDetails(!showDetails)}
                endIcon={
                  <ExpandIcon
                    sx={{
                      transform: showDetails
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  />
                }
                sx={{ color: '#94A3B8', mb: 2, textTransform: 'none' }}
              >
                {showDetails ? 'Hide' : 'Show'} technical details
              </Button>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: '#1E293B',
                      borderColor: '#334155',
                      textAlign: 'left',
                      maxHeight: 200,
                      overflow: 'auto',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        color: '#EF4444',
                        display: 'block',
                        mb: 1,
                        fontWeight: 600,
                      }}
                    >
                      {error.name}: {error.message}
                    </Typography>
                    {error.digest && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily:
                            '"JetBrains Mono", "Fira Code", monospace',
                          color: '#64748B',
                          display: 'block',
                        }}
                      >
                        Digest: {error.digest}
                      </Typography>
                    )}
                  </Paper>
                </motion.div>
              )}
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
