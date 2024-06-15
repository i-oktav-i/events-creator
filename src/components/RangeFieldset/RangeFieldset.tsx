import { FC, useState } from "react";
import { Field } from "react-final-form";

import s from "./RangeFieldset.module.css";
import { bevis } from "../../utils/bevis";

const b = bevis(s, "RangeFieldset");

export type RangeFieldsetProps = {
  name: string;
  label: string;
};

export const RangeFieldset: FC<RangeFieldsetProps> = ({ name, label }) => {
  const [withStart, setWithStart] = useState(false);
  const [withEnd, setWithEnd] = useState(false);

  return (
    <fieldset className={b()}>
      <legend>{label}</legend>

      <label className={b("RangeItem")}>
        <span className={b("RangeItemTitle")}>
          Старт
          <input
            type="checkbox"
            checked={withStart}
            onChange={() => setWithStart((prev) => !prev)}
          />
        </span>

        {withStart ? (
          <Field name={`${name}.min`} component="input" type="number" />
        ) : null}
      </label>

      <label className={b("RangeItem")}>
        <span className={b("RangeItemTitle")}>
          Конец
          <input
            type="checkbox"
            checked={withEnd}
            onChange={() => setWithEnd((prev) => !prev)}
          />
        </span>

        {withEnd ? (
          <Field name={`${name}.max`} component="input" type="number" />
        ) : null}
      </label>
    </fieldset>
  );
};
