import { FC, useEffect, useState } from "react";

import { FormApi } from "final-form";

import { bevis } from "../../utils/bevis";

import { NumberInput } from "../NumberInput";

import s from "./RangeFieldset.module.css";

const b = bevis(s, "RangeFieldset");

export type RangeFieldsetProps = {
  name: string;
  label: string;
  form: FormApi;
};

export const RangeFieldset: FC<RangeFieldsetProps> = ({
  name,
  label,
  form,
}) => {
  const [withStart, setWithStart] = useState(false);
  const [withEnd, setWithEnd] = useState(false);

  const startName = `${name}.min`;
  const endName = `${name}.max`;

  useEffect(() => {
    if (withStart) return;

    form.change(startName, 0);
  }, [form, startName, withStart]);

  useEffect(() => {
    if (withEnd) return;

    form.change(endName, 0);
  }, [endName, form, withEnd]);

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

        {withStart ? <NumberInput label="" name={startName} /> : null}
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

        {withEnd ? <NumberInput label="" name={endName} /> : null}
      </label>
    </fieldset>
  );
};
