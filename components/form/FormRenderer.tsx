'use client';

import React from 'react';
import { Typography, Grid, Box, Divider } from '@mui/material';
import { FormInput } from '@/components/form/FormInput';
import { FormSectionConfig } from '@/lib/form-schema';

interface FormRendererProps {
  schema: FormSectionConfig;
  readOnly?: boolean;
  /** Optional: render extra content after the title (e.g., upload area) */
  children?: React.ReactNode;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  readOnly = false,
  children,
}) => {
  return (
    <Grid container spacing={2}>
      {/* Section Header */}
      <Grid size={{ xs: 12 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {schema.title}
          </Typography>
          {schema.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {schema.description}
            </Typography>
          )}
        </Box>
        <Divider sx={{ mb: 1 }} />
      </Grid>

      {/* Dynamic Fields */}
      {schema.fields.map((field) => {
        const gridSize = field.gridSize ?? { xs: 12 };
        const isTextarea = field.type === 'textarea';
        const isSelect = field.type === 'select';
        const isDate = field.type === 'date';

        return (
          <Grid key={field.name} size={gridSize}>
            <FormInput
              name={field.name}
              label={field.label}
              type={
                isTextarea
                  ? 'text'
                  : isSelect
                    ? undefined
                    : (field.type ?? 'text')
              }
              required={field.required}
              disabled={readOnly}
              multiline={isTextarea}
              rows={isTextarea ? (field.rows ?? 3) : undefined}
              placeholder={field.placeholder}
              helperText={!readOnly ? field.helperText : undefined}
              options={isSelect ? field.options : undefined}
              InputLabelProps={isDate ? { shrink: true } : undefined}
            />
          </Grid>
        );
      })}

      {/* Extra content slot (e.g., file uploads) */}
      {children && <Grid size={{ xs: 12 }}>{children}</Grid>}
    </Grid>
  );
};
