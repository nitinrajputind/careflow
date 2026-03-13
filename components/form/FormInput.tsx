'use client';

import React from 'react';
import { TextField, TextFieldProps, MenuItem } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

interface FormInputProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  options?: { label: string; value: string }[];
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  options,
  helperText,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <TextField
          {...field}
          {...props}
          select={!!options}
          error={!!error}
          helperText={error?.message || helperText || ''}
          fullWidth
          margin="normal"
          slotProps={{
            formHelperText: {
              sx: {
                ml: 0.5,
                fontWeight: error ? 500 : 400,
              },
            },
          }}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
