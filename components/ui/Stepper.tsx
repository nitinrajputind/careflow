'use client';

import React from 'react';
import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  Box,
  StepConnector,
  stepConnectorClasses,
  styled,
} from '@mui/material';
import type { StepIconProps } from '@mui/material';
import {
  Person as PersonIcon,
  EventNote as NoteIcon,
  AttachFile as AttachIcon,
  FilePresent as ReviewIcon,
} from '@mui/icons-material';

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'linear-gradient(95deg, #0F172A 0%, #3B82F6 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'linear-gradient(95deg, #0F172A 0%, #10B981 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#E2E8F0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: '#F8FAFC',
  zIndex: 1,
  color: '#64748B',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #E2E8F0',
  transition: 'all 0.4s ease',
  ...(ownerState.active && {
    background: '#0F172A',
    color: 'white',
    borderColor: '#0F172A',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    transform: 'scale(1.1)',
  }),
  ...(ownerState.completed && {
    background: '#10B981',
    color: 'white',
    borderColor: '#10B981',
  }),
}));

const STEP_ICONS: Record<number, React.ReactElement> = {
  1: <PersonIcon />,
  2: <NoteIcon />,
  3: <AttachIcon />,
  4: <ReviewIcon />,
};

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {STEP_ICONS[Number(icon)]}
    </ColorlibStepIconRoot>
  );
}

interface StepperProps {
  activeStep: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ activeStep, steps }) => {
  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <MuiStepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              sx={{
                '& .MuiStepLabel-label': {
                  mt: 1,
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  color: 'text.secondary',
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: 'primary.main',
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: 'success.main',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
};
