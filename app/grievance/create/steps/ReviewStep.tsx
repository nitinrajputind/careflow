'use client';

import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Divider,
  IconButton,
  Paper,
  Chip,
  Alert,
  ImageList,
  ImageListItem,
} from '@mui/material';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { Edit as EditIcon } from '@mui/icons-material';
import { GrievanceFormData } from '@/lib/validations/grievance';

interface ReviewStepProps {
  onEdit: (step: number) => void;
  readOnly?: boolean;
}

interface SectionHeaderProps {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  readOnly?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  step,
  onEdit,
  readOnly,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 1,
      mt: 2,
    }}
  >
    <Typography variant="h6" color="primary">
      {title}
    </Typography>
    {!readOnly && (
      <IconButton size="small" onClick={() => onEdit(step)}>
        <EditIcon sx={{ fontSize: 18 }} />
      </IconButton>
    )}
  </Box>
);

export const ReviewStep: React.FC<ReviewStepProps> = ({ onEdit, readOnly }) => {
  const { getValues } = useFormContext<GrievanceFormData>();
  const values = getValues();

  return (
    <Box>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {readOnly ? 'Grievance Details' : 'Review Your Submission'}
        </Typography>
        {readOnly && (
          <Chip
            label="READ-ONLY MODE"
            color="info"
            variant="outlined"
            size="small"
          />
        )}
      </Box>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <SectionHeader
          title="Reporter Details"
          step={0}
          onEdit={onEdit}
          readOnly={readOnly}
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Name
            </Typography>
            <Typography variant="body2">{values.reporter.name}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Employee ID
            </Typography>
            <Typography variant="body2">
              {values.reporter.employeeId}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body2">{values.reporter.email}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Department
            </Typography>
            <Typography variant="body2">
              {values.reporter.department}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Shift
            </Typography>
            <Typography variant="body2">{values.reporter.shift}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Contact
            </Typography>
            <Typography variant="body2">
              {values.reporter.contactNumber}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <SectionHeader
          title="Incident Details"
          step={1}
          onEdit={onEdit}
          readOnly={readOnly}
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" color="textSecondary">
              Title
            </Typography>
            <Typography variant="body2">{values.incident.title}</Typography>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography variant="caption" color="textSecondary">
              Type
            </Typography>
            <Box>
              <Chip label={values.incident.type} size="small" />
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography variant="caption" color="textSecondary">
              Severity
            </Typography>
            <Box>
              <Chip
                label={values.incident.severity}
                size="small"
                color={
                  values.incident.severity === 'Critical'
                    ? 'error'
                    : values.incident.severity === 'High'
                      ? 'warning'
                      : values.incident.severity === 'Medium'
                        ? 'info'
                        : 'default'
                }
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Typography variant="caption" color="textSecondary">
              Date
            </Typography>
            <Typography variant="body2">{values.incident.date}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Location
            </Typography>
            <Typography variant="body2">{values.incident.location}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="caption" color="textSecondary">
              Patient ID
            </Typography>
            <Typography variant="body2">
              {values.incident.patientId || 'N/A'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" color="textSecondary">
              Witnesses
            </Typography>
            <Typography variant="body2">
              {values.incident.witnesses || 'None reported'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" color="textSecondary">
              Description
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {values.incident.description}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <SectionHeader
          title="Supporting Information"
          step={2}
          onEdit={onEdit}
          readOnly={readOnly}
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" color="textSecondary">
              Additional Notes
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {values.supporting.additionalNotes || 'N/A'}
            </Typography>
          </Grid>
          {values.supporting.images && values.supporting.images.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Typography variant="caption" color="textSecondary">
                Images
              </Typography>
              <ImageList
                sx={{ width: '100%', height: 'auto' }}
                cols={4}
                rowHeight={100}
              >
                {values.supporting.images.map((img, index) => (
                  <ImageListItem
                    key={index}
                    sx={{ position: 'relative', height: 100 }}
                  >
                    <Image
                      src={img}
                      alt={`Attachment ${index}`}
                      fill
                      style={{
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          )}
        </Grid>
      </Paper>

      {!readOnly && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Please ensure all information is accurate before submitting. Once
          submitted, the grievance will be officially recorded.
        </Alert>
      )}
    </Box>
  );
};
