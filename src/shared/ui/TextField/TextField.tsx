import { ReactNode, forwardRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { InputLabelWrapper } from '../InputLabelWrapper';

import * as s from './TextField.css';

export type TextFieldProps = UseFormRegisterReturn & {
  label?: string | ReactNode;
  placeholder?: string;
  asTextArea?: boolean;
  error?: FieldError;
  readOnly?: boolean;
};

export const TextField = forwardRef<HTMLInputElement & HTMLAreaElement, TextFieldProps>(
  function TextField(
    { label, placeholder, asTextArea, error, readOnly, ...field }: TextFieldProps,
    ref,
  ) {
    const Component = asTextArea ? 'textarea' : 'input';

    return (
      <InputLabelWrapper label={label} error={error}>
        <Component
          {...field}
          // biome-ignore lint/suspicious/noExplicitAny: TODO: Подумать, как исправить
          ref={ref as any}
          placeholder={placeholder}
          className={s.input[Component]}
          readOnly={readOnly}
        />
      </InputLabelWrapper>
    );
  },
);
