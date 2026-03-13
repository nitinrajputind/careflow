'use client';

import React from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import {
  Home as HomeIcon,
  ArrowBack as BackIcon,
  SearchOff as SearchOffIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            {/* Animated 404 Number */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            >
              <Box
                sx={{ position: 'relative', display: 'inline-block', mb: 2 }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '8rem', md: '12rem' },
                    fontWeight: 900,
                    lineHeight: 1,
                    background:
                      'linear-gradient(135deg, #0F172A 0%, #3B82F6 50%, #10B981 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.05em',
                    userSelect: 'none',
                  }}
                >
                  404
                </Typography>
                {/* Floating icon */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    position: 'absolute',
                    top: '25%',
                    right: '-10%',
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      bgcolor: 'rgba(59, 130, 246, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
                    }}
                  >
                    <SearchOffIcon sx={{ fontSize: 28, color: '#3B82F6' }} />
                  </Box>
                </motion.div>
              </Box>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 2, color: '#0F172A' }}
              >
                Page not found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#64748B',
                  maxWidth: 400,
                  mx: 'auto',
                  mb: 5,
                  lineHeight: 1.7,
                }}
              >
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved. Let&apos;s get you back on track.
              </Typography>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  component={Link}
                  href="/"
                  variant="contained"
                  size="large"
                  startIcon={<HomeIcon />}
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
                      boxShadow: '0 6px 20px rgba(15, 23, 42, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Go Home
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<BackIcon />}
                  onClick={() => window.history.back()}
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
                  Go Back
                </Button>
              </Stack>
            </motion.div>

            {/* Bottom decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Box
                sx={{
                  mt: 8,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#CBD5E1',
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
