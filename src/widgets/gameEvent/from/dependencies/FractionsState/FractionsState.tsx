import { FC, ReactNode } from 'react';
import { FieldPath } from 'react-hook-form';

import {
  GameEvent,
  fractionsShortage,
  illegalNormalFractionsOrder,
  illegalStrangeFractionsOrder,
  legalFractionsOrder,
} from '@entities/gameEvent';
import { RangeFieldset } from '@shared/ui';

import {
  fractionsGroupContainer,
  fractionsGroupContent,
  fractionsStateContainer,
  rangeInput,
} from './FractionsState.css';

type FractionGroupPath = FieldPath<GameEvent> extends infer Keys
  ? Keys extends `${infer U extends `${string}.influence`}.${'min' | 'max'}`
    ? U
    : never
  : never;

type FractionsGroupProps = {
  name: FractionGroupPath;
  label: string;
  children?: ReactNode;
};

const FractionsGroup: FC<FractionsGroupProps> = ({ label, name, children }) => {
  return (
    <fieldset className={fractionsGroupContainer}>
      <RangeFieldset<GameEvent> label={label} name={name} inputClassName={rangeInput} />

      <div className={fractionsGroupContent}>{children}</div>
    </fieldset>
  );
};

export type FractionsStateProps = {
  name: 'dependencies.state.fractionsState' | `actions.${number}.dependencies.state.fractionsState`;
};

export const FractionsState: FC<FractionsStateProps> = ({ name }) => {
  return (
    <fieldset className={fractionsStateContainer}>
      <legend>Fractions</legend>

      <div className={fractionsStateContainer}>
        <FractionsGroup label="Legal" name={`${name}.legal.influence`}>
          {legalFractionsOrder.map((fraction) => (
            <RangeFieldset<GameEvent>
              key={fraction}
              label={fractionsShortage[fraction]}
              name={`${name}.legal.fractions.${fraction}`}
              inputClassName={rangeInput}
            />
          ))}
        </FractionsGroup>

        <FractionsGroup label="Illegal" name={`${name}.illegal.influence` as const}>
          <FractionsGroup label="Normal" name={`${name}.illegal.normal.influence`}>
            {illegalNormalFractionsOrder.map((fraction) => (
              <RangeFieldset<GameEvent>
                key={fraction}
                label={fractionsShortage[fraction]}
                name={`${name}.illegal.normal.fractions.${fraction}`}
                inputClassName={rangeInput}
              />
            ))}
          </FractionsGroup>

          <FractionsGroup label="Strange" name={`${name}.illegal.strange.influence`}>
            {illegalStrangeFractionsOrder.map((fraction) => (
              <RangeFieldset<GameEvent>
                key={fraction}
                label={fractionsShortage[fraction]}
                name={`${name}.illegal.strange.fractions.${fraction}`}
                inputClassName={rangeInput}
              />
            ))}
          </FractionsGroup>
        </FractionsGroup>
      </div>
    </fieldset>
  );
};
