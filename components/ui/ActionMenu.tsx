'use client';

import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';

export interface ActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

interface ActionMenuProps {
  actions: ActionItem[];
  tooltip?: string;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  actions,
  tooltip = 'Actions',
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event?: React.MouseEvent<HTMLElement> | {}) => {
    if (event && 'stopPropagation' in event) {
      (event as React.MouseEvent<HTMLElement>).stopPropagation();
    }
    setAnchorEl(null);
  };

  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    onClick: () => void,
  ) => {
    event.stopPropagation();
    handleClose();
    onClick();
  };

  return (
    <>
      <Button
        size="small"
        onClick={handleClick}
        aria-controls={open ? 'action-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              transition: 'transform 0.3s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        }
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          px: 2,
          py: 0.75,
          fontSize: '0.875rem',
          bgcolor: open ? 'primary.main' : 'rgba(15, 23, 42, 0.04)',
          color: open ? 'common.white' : 'text.primary',
          boxShadow: open ? '0 4px 12px rgba(59, 130, 246, 0.25)' : 'none',
          border: '1px solid transparent',
          '&:hover': {
            bgcolor: open ? 'primary.dark' : 'rgba(15, 23, 42, 0.08)',
            transform: open ? 'none' : 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {tooltip}
      </Button>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'action-button',
          sx: { p: 0 }, // use PaperProps padding instead
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 180,
            mt: 1,
            p: 1, // padding for the inner menu
            borderRadius: '12px',
            boxShadow:
              '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.95)',
          },
        }}
      >
        {actions.map((action, idx) => (
          <MenuItem
            key={idx}
            onClick={(e) => handleActionClick(e, action.onClick)}
            disabled={action.disabled}
            sx={{
              py: 1,
              px: 1.5,
              mb: idx !== actions.length - 1 ? 0.5 : 0, // margin between items except last
              borderRadius: '8px',
              color: action.color ? `${action.color}.main` : 'text.primary',
              '& .MuiListItemIcon-root': {
                color: action.color ? `${action.color}.main` : 'text.secondary',
                minWidth: 32,
              },
              '&:hover': {
                bgcolor: action.color
                  ? `rgba(var(--${action.color}-main-channel, 0, 0, 0), 0.08)`
                  : 'rgba(15, 23, 42, 0.04)',
              },
            }}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
            >
              {action.label}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
