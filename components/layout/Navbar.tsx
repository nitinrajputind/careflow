'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AddCircleOutline as PlusIcon,
  NotificationsNone as BellIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid #E2E8F0' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
              }}
              onClick={() => router.push('/')}
            >
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: 0.5,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <DashboardIcon fontSize="small" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'text.primary',
                }}
              >
                CareFlow
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button
                startIcon={<DashboardIcon />}
                onClick={() => router.push('/dashboard')}
                sx={{
                  color: isActive('/dashboard')
                    ? 'primary.main'
                    : 'text.secondary',
                  bgcolor: isActive('/dashboard')
                    ? 'rgba(15, 23, 42, 0.04)'
                    : 'transparent',
                }}
              >
                Dashboard
              </Button>
              <Button
                startIcon={<PlusIcon />}
                onClick={() => router.push('/grievance/create')}
                sx={{
                  color: isActive('/grievance/create')
                    ? 'primary.main'
                    : 'text.secondary',
                  bgcolor: isActive('/grievance/create')
                    ? 'rgba(15, 23, 42, 0.04)'
                    : 'transparent',
                }}
              >
                New Report
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Notifications">
              <IconButton size="small">
                <BellIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Help">
              <IconButton size="small">
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'secondary.main',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              JD
            </Avatar>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
