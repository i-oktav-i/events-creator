import { FormApi } from 'final-form';
import _get from 'lodash/get';
import { FC, useState } from 'react';
import { useFormState } from 'react-final-form';

import { GameEvent } from '@entities/gameEvent';

import { EventSelectModal } from './EventSelectModal';

import * as s from './EventSelect.css';

export type EventSelectProps = {
  name: string;
  events: GameEvent[];
  form: FormApi;
  label: string;
};

export const EventSelect: FC<EventSelectProps> = ({ name, events, form, label }) => {
  const { values } = useFormState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selected = _get(values, name, []) as number[];

  const onRemove = (id: number) => {
    form.change(
      name,
      selected.filter((eventId) => eventId !== id),
    );
  };

  return (
    <fieldset className={s.eventSelect}>
      <legend>{label}</legend>

      <div className={s.eventSelectSelectedContainer}>
        {selected.map((id) => (
          <span key={id} className={s.eventSelectSelectedItem}>
            <span>{events.find((event) => event.id === id)?.title}</span>
            <button type="button" onClick={() => onRemove(id)}>
              X
            </button>
          </span>
        ))}
      </div>

      <button type="button" onClick={() => setIsModalOpen(true)}>
        Добавить
      </button>

      {isModalOpen ? (
        <EventSelectModal
          events={events}
          initialSelectedEvents={selected}
          onClose={() => setIsModalOpen(false)}
          onSelect={(selectedEvents) => {
            form.change(name, selectedEvents);
            setIsModalOpen(false);
          }}
        />
      ) : null}
    </fieldset>
  );
};
