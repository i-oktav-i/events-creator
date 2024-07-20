import { FC } from 'react';

import { NumberInput } from '../NumberInput';

import * as s from './RangeFieldset.css';

export type RangeFieldsetProps = {
  name: string;
  label: string;
};

export const RangeFieldset: FC<RangeFieldsetProps> = ({ name, label }) => {
  const startName = `${name}.min`;
  const endName = `${name}.max`;

  return (
    <fieldset className={s.rangeFieldset}>
      <legend>{label}</legend>

      <label className={s.rangeFieldsetItem}>
        <span className={s.rangeFieldsetItemTitle}>Старт</span>

        <NumberInput label="" name={startName} />
      </label>

      <label className={s.rangeFieldsetItem}>
        <span className={s.rangeFieldsetItemTitle}>Конец</span>

        <NumberInput label="" name={endName} />
      </label>
    </fieldset>
  );
};
