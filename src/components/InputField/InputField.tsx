import { FC } from "react";
import { Field } from "react-final-form";

import { required as requiredValidator } from "../../utils/form";

import { bevis } from "../../utils/bevis";

import s from "./InputField.module.css";

const b = bevis(s, "InputField");

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
  const Component = asTextArea ? "textarea" : "input";

  return (
    <Field<string>
      name={name}
      validate={required ? requiredValidator : undefined}
    >
      {({ input, meta }) => (
        <label className={b({ error: meta.error && meta.touched })}>
          <span className={b("title")}>
            {label}

            {meta.error && meta.touched && (
              <span className={b("error")}>{meta.error}</span>
            )}
          </span>

          <Component {...input} placeholder={placeholder} />
        </label>
      )}
    </Field>
  );
};
