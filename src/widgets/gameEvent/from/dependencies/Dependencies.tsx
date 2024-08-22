import { FC } from 'react';

import { GameEvent, Dependencies as GameEventDependencies } from '@entities/gameEvent';
import { locale as fullLocale } from '@shared/locale';
import { RangeFieldset } from '@shared/ui';

import { FractionsState } from './FractionsState';
import { IdsDependencies } from './Ids';

import * as s from './Dependencies.css';

const locale = fullLocale.gameEvents.dependencies;

export type DependenciesProps = {
  name: 'dependencies' | `actions.${number}.dependencies`;
};

type StateKeys = Exclude<keyof NonNullable<GameEventDependencies['state']>, 'fractionsState'>;

const dependenciesStateOrder: StateKeys[] = [
  'week',
  'money',
  'policeAttention',
  'equalityAndBrotherhoodReputation',
  'honorAndConscienceReputation',
  'pathToThePeakReputation',
  'publishingHouseReputation',
  'powerOfTraditionReputation',
  'redWaterReputation',
  'revolutionaryAvantGardeReputation',
  'truthInWealthReputation',
  'woodenStickReputation',
];

export const Dependencies: FC<DependenciesProps> = ({ name }) => {
  return (
    <fieldset>
      <legend>{locale.title}</legend>

      <summary className={s.summaryContainer}>
        {locale.events.required}

        <details>
          <IdsDependencies
            name={`${name}.events.required`}
            label={locale.events.required}
            idsType={'events'}
          />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        {locale.events.blocking}

        <details>
          <IdsDependencies
            name={`${name}.events.blocking`}
            label={locale.events.blocking}
            idsType={'events'}
          />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        {locale.actions.required}

        <details>
          <IdsDependencies
            name={`${name}.actions.required`}
            label={locale.actions.required}
            idsType={'actions'}
          />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        {locale.actions.blocking}

        <details>
          <IdsDependencies
            name={`${name}.actions.blocking`}
            label={locale.actions.blocking}
            idsType={'actions'}
          />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        {locale.state.title}

        <details>
          <div className={s.stateContainer}>
            {dependenciesStateOrder.map((key) => (
              <RangeFieldset<GameEvent>
                key={key}
                name={`${name}.state.${key}`}
                label={locale.state[key]}
                min={0}
              />
            ))}
          </div>
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        {locale.state.fractionsState.title}

        <details>
          <FractionsState name={`${name}.state.fractionsState`} />
        </details>
      </summary>
    </fieldset>
  );
};
