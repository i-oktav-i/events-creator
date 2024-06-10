import { FormApi } from "final-form";
import { FC, useState } from "react";
import { useFormState } from "react-final-form";

import _get from "lodash/get";
import { GameEvent } from "../../typings/event";
import { EventSelectModal } from "./EventSelectModal";

import { bevis } from "../../utils/bevis";
import s from "./EventSelect.module.css";

const b = bevis(s, "EventSelect");

export type EventSelectProps = {
  name: string;
  events: GameEvent[];
  form: FormApi;
  label: string;
};

export const EventSelect: FC<EventSelectProps> = ({
  name,
  events,
  form,
  label,
}) => {
  const { values } = useFormState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selected = _get(values, name, []) as number[];

  const onRemove = (id: number) => {
    form.change(
      name,
      selected.filter((eventId) => eventId !== id)
    );
  };

  return (
    <fieldset className={b()}>
      <legend>{label}</legend>

      <div className={b("SelectedContainer")}>
        {selected.map((id) => (
          <span key={id} className={b("SelectedItem")}>
            <span>{events.find((event) => event.id === id)?.title}</span>
            <button type="button" onClick={() => onRemove(id)}>
              X
            </button>
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={b("OpenModal")}
      >
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
