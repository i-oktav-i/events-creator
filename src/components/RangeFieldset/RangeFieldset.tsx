import { FC, useState } from "react";

import { bevis } from "../../utils/bevis";

import { NumberInput } from "../NumberInput";

import s from "./RangeFieldset.module.css";

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

        {withStart ? <NumberInput label="" name={`${name}.min`} /> : null}
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

        {withEnd ? <NumberInput label="" name={`${name}.max`} /> : null}
      </label>
    </fieldset>
  );
};
