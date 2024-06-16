import { FC } from "react";

import { bevis } from "../../utils/bevis";

import { NumberInput } from "../NumberInput";

import s from "./RangeFieldset.module.css";

const b = bevis(s, "RangeFieldset");

export type RangeFieldsetProps = {
  name: string;
  label: string;
};

export const RangeFieldset: FC<RangeFieldsetProps> = ({ name, label }) => {
  const startName = `${name}.min`;
  const endName = `${name}.max`;

  return (
    <fieldset className={b()}>
      <legend>{label}</legend>

      <label className={b("RangeItem")}>
        <span className={b("RangeItemTitle")}>Старт</span>

        <NumberInput label="" name={startName} />
      </label>

      <label className={b("RangeItem")}>
        <span className={b("RangeItemTitle")}>Конец</span>

        <NumberInput label="" name={endName} />
      </label>
    </fieldset>
  );
};
