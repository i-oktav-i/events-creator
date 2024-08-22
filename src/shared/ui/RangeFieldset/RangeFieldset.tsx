import _get from 'lodash/get';
import { useEffect, useState } from 'react';
import { FieldError, FieldPath, useFormContext } from 'react-hook-form';

import { AnyObject } from '@shared/typings';
import { NumberInput } from '../NumberInput';

import { locale } from '@shared/locale';
import * as s from './RangeFieldset.css';

type MinMax = 'min' | 'max';

type ExtractPath<Name extends string> = (
  Name extends `${infer U extends string}.${MinMax}`
    ? U
    : never
) extends infer RawName extends string
  ? RawName extends string
    ? `${RawName}.${MinMax}` extends Name
      ? RawName
      : never
    : never
  : never;

export type RangeFieldsetProps<T extends AnyObject> = {
  name: ExtractPath<FieldPath<T>>;
  label: string;
  min?: number;
  max?: number;
  inputClassName?: string;
};

export const RangeFieldset = <T extends AnyObject>({
  name,
  label,
  max,
  min,
  inputClassName,
}: RangeFieldsetProps<T>) => {
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext<T>();

  const [withEnd, setWithEnd] = useState(false);

  const startName = `${name}.min` as Extract<FieldPath<T>, `${string}.min`>;
  const endName = `${name}.max` as Extract<FieldPath<T>, `${string}.max`>;

  const fieldsErrors = _get(errors, name) as { [T in MinMax]?: FieldError } | undefined;

  const endLabel = (
    <>
      {locale.range.end}

      <input
        type="checkbox"
        checked={withEnd}
        onChange={(event) => setWithEnd(event.target.checked)}
      />
    </>
  );

  useEffect(() => {
    if (withEnd) return;

    unregister(endName);
  }, [withEnd, unregister, endName]);

  return (
    <fieldset className={s.rangeFieldset}>
      <legend>{label}</legend>

      <NumberInput
        {...register(startName, {
          min: typeof min === 'number' ? { message: `Minimum ${min}`, value: min } : undefined,
        })}
        label={locale.range.start}
        error={fieldsErrors?.min}
        inputClassName={inputClassName}
      />

      {withEnd ? (
        <NumberInput
          {...register(endName, {
            required: 'Required',
            max: typeof max === 'number' ? { message: `Maximum ${max}`, value: max } : undefined,
          })}
          label={endLabel}
          error={fieldsErrors?.max}
          inputClassName={inputClassName}
        />
      ) : (
        endLabel
      )}
    </fieldset>
  );
};
