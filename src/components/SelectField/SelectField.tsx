import { Field } from "react-final-form";

import { bevis } from "../../utils/bevis";

import s from "./SelectField.module.css";

const b = bevis(s, "SelectField");

export type SelectFieldProps<T extends string | number> = {
  name: string;
  label: string;
  options: {
    value: T;
    label: string;
  }[];
};

export const SelectField = <T extends string | number>({
  name,
  options,
  label,
}: SelectFieldProps<T>) => {
  if (!options.length) return null;

  return (
    <label className={b()}>
      {label}

      <Field<T> name={name} component="select" defaultValue={options[0]?.value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    </label>
  );
};
