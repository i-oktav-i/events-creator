import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { ForwardedRef, JSX, forwardRef } from 'react';
import { InputLabelWrapper } from '../InputLabelWrapper';

export type SelectFieldProps<T extends string | number> = UseFormRegisterReturn & {
  label: string;
  options: {
    value: T;
    label: string;
  }[];
  error?: FieldError;
};

export const SelectField = forwardRef(
  <T extends string | number>(
    { label, options, error, ...field }: SelectFieldProps<T>,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    if (!options.length) return null;

    return (
      <InputLabelWrapper label={label} error={error}>
        <select {...field} ref={ref}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </InputLabelWrapper>
    );
  },
) as <T extends string | number>(
  { label, options, error, ...field }: SelectFieldProps<T>,
  ref: ForwardedRef<HTMLSelectElement>,
) => JSX.Element | null;
