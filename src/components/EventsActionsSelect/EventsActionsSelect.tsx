import { FC, useState } from "react";
import _get from "lodash/get";

import { bevis } from "../../utils/bevis";
import s from "./EventsActionsSelect.module.css";
import { GameEvent } from "../../typings/event";
import { FormApi } from "final-form";
import { useFormState } from "react-final-form";
import { EventsActionsSelectModal } from "./EventsActionsSelectModal";

const b = bevis(s, "EventsActionsSelect");

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
      selected.filter((eventId) => eventId !== id)
    );
  };

  const actionsEvents = events.filter((event) =>
    event.actions.some((action) => selected.includes(action.id))
  );

  return (
    <fieldset className={b()}>
      <legend>{label}</legend>

      <div className={b("SelectedContainer")}>
        {actionsEvents.map((event) => (
          <span key={event.id} className={b("SelectedItem")}>
            <span>{event.title}</span>
            <p>{event.description}</p>

            {event.actions.map(
              (action) =>
                selected.includes(action.id) && (
                  <span key={action.id} className={b("SelectedItemActions")}>
                    <span>{action.title}</span>
                    <button type="button" onClick={() => onRemove(action.id)}>
                      X
                    </button>
                  </span>
                )
            )}
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
