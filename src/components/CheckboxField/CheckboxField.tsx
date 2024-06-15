import { Field } from "react-final-form";

import { FC } from "react";

import { bevis } from "../../utils/bevis";

import s from "./CheckboxField.module.css";

const b = bevis(s, "CheckboxField");

export type CheckboxFieldProps = {
  name: string;
  label: string;
};

export const CheckboxField: FC<CheckboxFieldProps> = ({ name, label }) => {
  return (
    <label className={b()}>
      {label}

      <Field<boolean> name={name} component="input" type="checkbox" />
    </label>
  );
};
