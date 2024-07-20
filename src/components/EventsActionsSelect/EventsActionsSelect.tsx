import _get from 'lodash/get';
import { FC, useState } from 'react';

import { FormApi } from 'final-form';

import { useFormState } from 'react-final-form';

import { GameEvent } from '../../typings/event';

import * as s from './EventsActionsSelect.css';

import { EventsActionsSelectModal } from './EventsActionsSelectModal';

export type EventsActionsSelectProps = {
  name: string;
  events: GameEvent[];
  form: FormApi;
  label: string;
};

export const EventsActionsSelect: FC<EventsActionsSelectProps> = ({
  name,
  events,
  form,
  label,
}) => {
  const { values } = useFormState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const selected = _get(values, name, []) as string[];

  const onRemove = (id: string) => {
    form.change(
      name,
      selected.filter((eventId) => eventId !== id),
    );
  };

  const actionsEvents = events.filter((event) =>
    event.actions.some((action) => selected.includes(action.id)),
  );

  return (
    <fieldset className={s.eventsActionsSelect}>
      <legend>{label}</legend>

      <div className={s.eventsActionsSelectSelectedContainer}>
        {actionsEvents.map((event) => (
          <span key={event.id} className={s.eventsActionsSelectSelectedItem}>
            <span>{event.title}</span>
            <p>{event.description}</p>

            {event.actions.map(
              (action) =>
                selected.includes(action.id) && (
                  <span key={action.id} className={s.eventsActionsSelectSelectedItemActions}>
                    <span>{action.title}</span>
                    <button type="button" onClick={() => onRemove(action.id)}>
                      X
                    </button>
                  </span>
                ),
            )}
          </span>
        ))}
      </div>

      <button type="button" onClick={() => setIsModalOpen(true)}>
        Добавить
      </button>

      {isModalOpen && (
        <EventsActionsSelectModal
          events={events}
          initialSelectedEventsActions={selected}
          onClose={() => setIsModalOpen(false)}
          onSelect={(selectedEventsActions) => {
            form.change(name, selectedEventsActions);
            setIsModalOpen(false);
          }}
        />
      )}
    </fieldset>
  );
};
