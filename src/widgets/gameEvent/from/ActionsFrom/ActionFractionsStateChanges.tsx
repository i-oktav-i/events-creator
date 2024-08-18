import _get from 'lodash/get';
import { FC, ReactNode } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import {
  UnknownGameEvent,
  fractionsShortage,
  illegalNormalFractionsOrder,
  illegalStrangeFractionsOrder,
  legalFractionsOrder,
} from '@entities/gameEvent';
import { NumberInput } from '@shared/ui';

import {
  fractionsStateChangesContainer,
  fractionsStateChangesGroupContainer,
} from './ActionsFrom.css';

type FractionGroupPath = FieldPath<UnknownGameEvent> extends infer Keys
  ? Keys extends infer U extends `actions.${number}.${string}.influence`
    ? U
    : never
  : never;

type FractionsGroupProps = {
  name: FractionGroupPath;
  label: string;
  children?: ReactNode;
};

const FractionsGroup: FC<FractionsGroupProps> = ({ label, name, children }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UnknownGameEvent>();

  return (
    <fieldset className={fractionsStateChangesGroupContainer}>
      <NumberInput {...register(name)} label={label} error={_get(errors, name)} />

      <div className={fractionsStateChangesContainer}>{children}</div>
    </fieldset>
  );
};

export type ActionFractionsStateChangesProps = {
  name: `actions.${number}.changes.fractionsState`;
};

export const ActionFractionsStateChanges: FC<ActionFractionsStateChangesProps> = ({ name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UnknownGameEvent>();

  const fractionsStateChangesErrors = _get(errors, name) as NonNullable<
    NonNullable<NonNullable<(typeof errors)['actions']>[number]>['changes']
  >['fractionsState'];

  return (
    <fieldset className={fractionsStateChangesContainer}>
      <FractionsGroup label="Legal" name={`${name}.legal.influence`}>
        {legalFractionsOrder.map((fraction) => (
          <NumberInput
            {...register(`${name}.legal.fractions.${fraction}`)}
            key={fraction}
            label={fractionsShortage[fraction]}
            error={fractionsStateChangesErrors?.legal?.fractions?.[fraction]}
          />
        ))}
      </FractionsGroup>

      <FractionsGroup label="Illegal" name={`${name}.illegal.influence` as const}>
        <FractionsGroup label="Normal" name={`${name}.illegal.normal.influence`}>
          {illegalNormalFractionsOrder.map((fraction) => (
            <NumberInput
              {...register(`${name}.illegal.normal.fractions.${fraction}`)}
              key={fraction}
              label={fractionsShortage[fraction]}
              error={fractionsStateChangesErrors?.illegal?.normal?.fractions?.[fraction]}
            />
          ))}
        </FractionsGroup>

        <FractionsGroup label="Strange" name={`${name}.illegal.strange.influence`}>
          {illegalStrangeFractionsOrder.map((fraction) => (
            <NumberInput
              {...register(`${name}.illegal.strange.fractions.${fraction}`)}
              key={fraction}
              label={fractionsShortage[fraction]}
              error={fractionsStateChangesErrors?.illegal?.strange?.fractions?.[fraction]}
            />
          ))}
        </FractionsGroup>
      </FractionsGroup>
    </fieldset>
  );
};
