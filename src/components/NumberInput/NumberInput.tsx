import { FC } from "react";
import { Field } from "react-final-form";

export type NumberInputProps = {
  name: string;
  label: string;
};

export const NumberInput: FC<NumberInputProps> = ({ name, label }) => {
  return (
    <label>
      {label}

      <Field
        name={name}
        component="input"
        type="number"
        defaultValue={0}
        format={(value: number | undefined) =>
          value === undefined ? "" : `${value}`
        }
        parse={(value) => (!value ? undefined : parseInt(value, 10))}
      />
    </label>
  );
};
