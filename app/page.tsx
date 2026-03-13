'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import {
  Assignment as DashboardIcon,
  AddCircle as CreateIcon,
  VerifiedUser as SecurityIcon,
  History as HistoryIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(59, 130, 246, 0.1)',
            filter: 'blur(80px)',
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.75rem' },
                  }}
                >
                  Standardizing{' '}
                  <Box component="span" sx={{ color: 'secondary.main' }}>
                    Incident Reporting
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 6,
                    opacity: 0.8,
                    fontWeight: 400,
                    maxWidth: 600,
                    lineHeight: 1.6,
                  }}
                >
                  CareFlow provides a secure, intuitive, and high-performance
                  workflow for healthcare professionals to report and manage
                  workplace grievances.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component={Link}
                    href="/grievance/create"
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ArrowIcon />}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Start New Report
                  </Button>
                  <Button
                    component={Link}
                    href="/dashboard"
                    variant="outlined"
                    color="inherit"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderColor: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    Manage Dashboard
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        sx={{ mt: -6, position: 'relative', zIndex: 1, pb: 10 }}
      >
        <Grid container spacing={4}>
          {[
            {
              title: 'Structured Forms',
              desc: 'Intelligent multi-step validation ensures zero data loss and high-quality reporting.',
              icon: <CreateIcon sx={{ fontSize: 32 }} />,
              color: '#3B82F6',
            },
            {
              title: 'Offline Drafts',
              desc: 'Auto-saving capabilities allow you to resume reports anytime, anywhere.',
              icon: <HistoryIcon sx={{ fontSize: 32 }} />,
              color: '#10B981',
            },
            {
              title: 'HIPAA Ready',
              desc: 'Advanced encryption and secure data handling for sensitive healthcare information.',
              icon: <SecurityIcon sx={{ fontSize: 32 }} />,
              color: '#F59E0B',
            },
          ].map((item, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 5,
                    height: '100%',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow:
                        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                    },
                  }}
                >
                  <Box sx={{ color: item.color, mb: 3 }}>{item.icon}</Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {item.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <Typography variant="body2" color="text.disabled">
            © 2026 CareFlow Healthcare. Delivering safety through technological
            excellence.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
