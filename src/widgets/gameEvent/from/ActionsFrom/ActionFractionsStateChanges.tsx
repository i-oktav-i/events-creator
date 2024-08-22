import _get from 'lodash/get';
import { FC, ReactNode } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import {
  GameEvent,
  illegalNormalFractionsOrder,
  illegalStrangeFractionsOrder,
  legalFractionsOrder,
} from '@entities/gameEvent';
import { locale as fullLocale } from '@shared/locale';
import { NumberInput } from '@shared/ui';

import {
  fractionsStateChangesContainer,
  fractionsStateChangesGroupContainer,
} from './ActionsFrom.css';

const locale = fullLocale.fractions.shortage;
const fractionsStateLocale = fullLocale.gameEvents.dependencies.state.fractionsState;

type FractionGroupPath = FieldPath<GameEvent> extends infer Keys
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
  } = useFormContext<GameEvent>();

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
  } = useFormContext<GameEvent>();

  const fractionsStateChangesErrors = _get(errors, name) as NonNullable<
    NonNullable<NonNullable<(typeof errors)['actions']>[number]>['changes']
  >['fractionsState'];

  return (
    <fieldset className={fractionsStateChangesContainer}>
      <legend>{fractionsStateLocale.title}</legend>

      <FractionsGroup label={fractionsStateLocale.legal} name={`${name}.legal.influence`}>
        {legalFractionsOrder.map((fraction) => (
          <NumberInput
            {...register(`${name}.legal.fractions.${fraction}`)}
            key={fraction}
            label={locale[fraction]}
            error={fractionsStateChangesErrors?.legal?.fractions?.[fraction]}
          />
        ))}
      </FractionsGroup>

      <FractionsGroup
        label={fractionsStateLocale.illegal.title}
        name={`${name}.illegal.influence` as const}
      >
        <FractionsGroup
          label={fractionsStateLocale.illegal.normal}
          name={`${name}.illegal.normal.influence`}
        >
          {illegalNormalFractionsOrder.map((fraction) => (
            <NumberInput
              {...register(`${name}.illegal.normal.fractions.${fraction}`)}
              key={fraction}
              label={locale[fraction]}
              error={fractionsStateChangesErrors?.illegal?.normal?.fractions?.[fraction]}
            />
          ))}
        </FractionsGroup>

        <FractionsGroup
          label={fractionsStateLocale.illegal.strange}
          name={`${name}.illegal.strange.influence`}
        >
          {illegalStrangeFractionsOrder.map((fraction) => (
            <NumberInput
              {...register(`${name}.illegal.strange.fractions.${fraction}`)}
              key={fraction}
              label={locale[fraction]}
              error={fractionsStateChangesErrors?.illegal?.strange?.fractions?.[fraction]}
            />
          ))}
        </FractionsGroup>
      </FractionsGroup>
    </fieldset>
  );
};
