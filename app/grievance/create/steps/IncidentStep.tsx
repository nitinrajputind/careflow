'use client';

import React from 'react';
import { FormRenderer } from '@/components/form/FormRenderer';
import { incidentFieldsSchema } from '@/lib/form-schema';

export const IncidentStep = ({ readOnly }: { readOnly?: boolean }) => {
  return <FormRenderer schema={incidentFieldsSchema} readOnly={readOnly} />;
};
