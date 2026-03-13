'use client';

import React from 'react';
import { FormRenderer } from '@/components/form/FormRenderer';
import { reporterFieldsSchema } from '@/lib/form-schema';

export const ReporterStep = ({ readOnly }: { readOnly?: boolean }) => {
  return <FormRenderer schema={reporterFieldsSchema} readOnly={readOnly} />;
};
