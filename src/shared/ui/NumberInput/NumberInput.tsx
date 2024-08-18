import { ReactNode, forwardRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { InputLabelWrapper } from '../InputLabelWrapper';

export type NumberInputProps = UseFormRegisterReturn & {
  label: string | ReactNode;
  error?: FieldError;
  inputClassName?: string;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, error, inputClassName, ...field }, ref) => {
    return (
      <InputLabelWrapper label={label} error={error}>
        <input {...field} className={inputClassName} ref={ref} type="number" />
      </InputLabelWrapper>
    );
  },
);
