import { Field } from "react-final-form";

import { FC } from "react";

import * as s from "./CheckboxField.css";

export type CheckboxFieldProps = {
  name: string;
  label: string;
};

export const CheckboxField: FC<CheckboxFieldProps> = ({ name, label }) => {
  return (
    <label className={s.checkboxField}>
      {label}

      <Field<boolean> name={name} component="input" type="checkbox" />
    </label>
  );
};
