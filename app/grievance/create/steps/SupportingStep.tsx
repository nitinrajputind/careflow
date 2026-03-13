'use client';

import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import {
  CloudUpload as UploadIcon,
  Close as RemoveIcon,
} from '@mui/icons-material';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormRenderer } from '@/components/form/FormRenderer';
import { supportingFieldsSchema } from '@/lib/form-schema';
import {
  MAX_FILE_SIZE,
  MAX_IMAGE_DIMENSION,
  IMAGE_QUALITY,
} from '@/lib/constants';

export const SupportingStep = ({ readOnly }: { readOnly?: boolean }) => {
  const { setValue, control } = useFormContext();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const images = useWatch({
    control,
    name: 'supporting.images',
    defaultValue: [],
  }) as string[];

  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_IMAGE_DIMENSION) {
            height *= MAX_IMAGE_DIMENSION / width;
            width = MAX_IMAGE_DIMENSION;
          }
        } else {
          if (height > MAX_IMAGE_DIMENSION) {
            width *= MAX_IMAGE_DIMENSION / height;
            height = MAX_IMAGE_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', IMAGE_QUALITY);
        resolve(compressedBase64);
      };
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (readOnly) return;
    setUploadError(null);

    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const rejectedFiles: string[] = [];
    const updatedImages = [...images];

    for (const file of fileArray) {
      // File size validation
      if (file.size > MAX_FILE_SIZE) {
        rejectedFiles.push(
          `${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`,
        );
        continue;
      }

      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const base64String = await base64Promise;
      const compressedString = await compressImage(base64String);

      if (!updatedImages.includes(compressedString)) {
        updatedImages.push(compressedString);
      }
    }

    if (rejectedFiles.length > 0) {
      setUploadError(`Rejected (exceeds 5MB): ${rejectedFiles.join(', ')}`);
    }

    setValue('supporting.images', updatedImages, { shouldValidate: true });

    // Reset file input so same file can be re-selected
    event.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    if (readOnly) return;
    const newImages = images.filter((_, i) => i !== index);
    setValue('supporting.images', newImages, { shouldValidate: true });
  };

  const imageUploadContent = (
    <>
      {uploadError && (
        <Alert
          severity="error"
          onClose={() => setUploadError(null)}
          sx={{ mb: 2 }}
        >
          {uploadError}
        </Alert>
      )}

      {!readOnly && (
        <Box
          sx={{
            border: '2px dashed #CBD5E1',
            borderRadius: 3,
            p: 4,
            textAlign: 'center',
            mb: 2,
            bgcolor: '#FAFBFC',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: '#F1F5F9',
              borderColor: '#94A3B8',
            },
          }}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <UploadIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 2 }} />
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
            Drag and drop files here or click to upload
          </Typography>
          <Button
            variant="outlined"
            component="label"
            size="small"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            Select Files
            <input
              id="file-upload"
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 1, color: 'text.secondary' }}
          >
            Optional: Upload images related to the incident. (Max 5MB per image)
          </Typography>
        </Box>
      )}

      {images.length > 0 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Uploaded Images ({images.length})
          </Typography>
          <ImageList
            sx={{ width: '100%', height: 'auto', maxHeight: 300 }}
            cols={3}
            rowHeight={164}
          >
            {images.map((img, index) => (
              <ImageListItem
                key={index}
                sx={{ position: 'relative', height: 164 }}
              >
                <Image
                  src={img}
                  alt={`Uploaded ${index + 1}`}
                  fill
                  style={{
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
                {!readOnly && (
                  <ImageListItemBar
                    sx={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    position="top"
                    actionIcon={
                      <IconButton
                        sx={{ color: 'white' }}
                        aria-label={`remove image ${index + 1}`}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <RemoveIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </>
  );

  return (
    <FormRenderer schema={supportingFieldsSchema} readOnly={readOnly}>
      {imageUploadContent}
    </FormRenderer>
  );
};
