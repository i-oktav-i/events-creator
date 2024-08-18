import { FC, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

import * as s from './InputLabelWrapper.css';

export type InputLabelWrapperProps = {
  label?: string | ReactNode;
  error?: FieldError;
  children?: ReactNode;
};

export const InputLabelWrapper: FC<InputLabelWrapperProps> = ({ label, error, children }) => (
  <label className={s.labelContainer({ error: !!error?.message })}>
    {error?.message || label ? (
      <span className={s.label}>
        {label}

        {error?.message && <span className={s.error}>{error.message}</span>}
      </span>
    ) : null}

    {children}
  </label>
);
