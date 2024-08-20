import { FC } from 'react';

import { GameEvent, dependenciesStateLabels } from '@entities/gameEvent';
import { objectEntries } from '@shared/lib';
import { RangeFieldset } from '@shared/ui';

import { FractionsState } from './FractionsState';
import { IdsDependencies } from './Ids';

import * as s from './Dependencies.css';

export type DependenciesProps = {
  name: 'dependencies' | `actions.${number}.dependencies`;
};

export const Dependencies: FC<DependenciesProps> = ({ name }) => {
  return (
    <fieldset>
      <legend>Dependencies</legend>

      <summary className={s.summaryContainer}>
        required events
        <details>
          <IdsDependencies name={`${name}.events.required`} idsType={'events'} />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        blocking events
        <details>
          <IdsDependencies name={`${name}.events.blocking`} idsType={'events'} />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        required actions
        <details>
          <IdsDependencies name={`${name}.actions.required`} idsType={'actions'} />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        blocking actions
        <details>
          <IdsDependencies name={`${name}.actions.blocking`} idsType={'actions'} />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        State
        <details>
          <div className={s.stateContainer}>
            {objectEntries(dependenciesStateLabels).map(([key, label]) => (
              <RangeFieldset<GameEvent>
                key={key}
                name={`${name}.state.${key}`}
                label={label}
                min={0}
              />
            ))}
          </div>
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        Fractions
        <details>
          <FractionsState name={`${name}.state.fractionsState`} />
        </details>
      </summary>
    </fieldset>
  );
};
