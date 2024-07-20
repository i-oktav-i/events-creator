import { FormApi } from 'final-form';
import { FC } from 'react';

import { Dependencies, GameEvent } from '../../typings/event';
import { EventSelect } from '../EventSelect';
import { EventsActionsSelect } from '../EventsActionsSelect';
import { RangeFieldset } from '../RangeFieldset';

import * as s from './DependenciesFormFields.css';

type StateKeys = keyof Required<Required<Dependencies>['state']>;

const stateFieldsOrder: {
  [K in StateKeys]: { name: K; label: string };
}[StateKeys][] = [
  { name: 'week', label: 'Временной диапазон' },
  { name: 'group1', label: 'Влияние группы 1' },
  { name: 'group2', label: 'Влияние группы 2' },
];

export type DependenciesFormFieldsProps = {
  events: GameEvent[];
  name: string;
  form: FormApi;
};

export const DependenciesFormFields: FC<DependenciesFormFieldsProps> = ({ name, events, form }) => {
  return (
    <fieldset className={s.dependenciesFormFields}>
      <legend>Зависимости</legend>

      <summary className={s.dependenciesFormFieldsSummary}>
        <details>
          <div className={s.dependenciesFormFieldsDetails}>
            {stateFieldsOrder.map(({ name: fieldName, label }) => (
              <RangeFieldset key={fieldName} name={`${name}.state.${fieldName}`} label={label} />
            ))}

            <EventSelect
              events={events}
              form={form}
              name={`${name}.events.required`}
              label="Обязательные события"
            />

            <EventSelect
              events={events}
              form={form}
              name={`${name}.events.blocking`}
              label="Блокирующие события"
            />

            <EventsActionsSelect
              events={events}
              form={form}
              name={`${name}.actions.required`}
              label="Обязательные действия"
            />

            <EventsActionsSelect
              events={events}
              form={form}
              name={`${name}.actions.blocking`}
              label="Блокирующие действия"
            />
          </div>
        </details>
      </summary>
    </fieldset>
  );
};
