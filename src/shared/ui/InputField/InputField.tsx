import { FC } from 'react';
import { Field } from 'react-final-form';

import { validators } from '@shared/formUtils';

import * as s from './InputField.css';

export type InputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  asTextArea?: boolean;
  required?: boolean;
};

export const InputField: FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  asTextArea,
  required = true,
}) => {
  const Component = asTextArea ? 'textarea' : 'input';

  return (
    <Field<string> name={name} validate={required ? validators.required : undefined}>
      {({ input, meta }) => (
        <label className={s.inputField({ error: meta.error && meta.touched })}>
          <span className={s.inputFieldTitle}>
            {label}

            {meta.error && meta.touched && <span className={s.inputFieldError}>{meta.error}</span>}
          </span>

          <Component {...input} placeholder={placeholder} />
        </label>
      )}
    </Field>
  );
};
