import { FC } from 'react';

import { UnknownGameEvent, dependenciesStateLabels } from '@entities/gameEvent';
import { objectEntries } from '@shared/lib';
import { RangeFieldset } from '@shared/ui';

import * as s from './Dependencies.css';
import { FractionsState } from './FractionsState';
import { IdsDependencies, IdsDependenciesProps } from './Ids';

export type DependenciesProps = {
  name: 'dependencies' | `actions.${number}.dependencies`;
  type: IdsDependenciesProps['idsType'];
};

export const Dependencies: FC<DependenciesProps> = ({ name, type }) => {
  return (
    <fieldset>
      <legend>Dependencies</legend>

      <summary className={s.summaryContainer}>
        required events
        <details>
          <IdsDependencies name={`${name}.events.required`} idsType={type} />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        blocking events
        <details>
          <IdsDependencies name={`${name}.events.blocking`} idsType={type} />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        required actions
        <details>
          <IdsDependencies name={`${name}.actions.required`} idsType={type} />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        blocking actions
        <details>
          <IdsDependencies name={`${name}.actions.blocking`} idsType={type} />
        </details>
      </summary>

      <summary className={s.summaryContainer}>
        State
        <details>
          <div className={s.stateContainer}>
            {objectEntries(dependenciesStateLabels).map(([key, label]) => (
              <RangeFieldset<UnknownGameEvent>
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
