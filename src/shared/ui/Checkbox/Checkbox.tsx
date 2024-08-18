import { forwardRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { InputLabelWrapper } from '../InputLabelWrapper';

import * as s from './Checkbox.css';

export type CheckboxProps = UseFormRegisterReturn & {
  label: string;
  error?: FieldError;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...field }, ref) => (
    <InputLabelWrapper label={label} error={error}>
      <input {...field} type="checkbox" ref={ref} className={s.checkbox} />
    </InputLabelWrapper>
  ),
);
