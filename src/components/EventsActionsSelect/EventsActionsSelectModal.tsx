import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { PORTAL_ID } from "../../constants";
import { useBlockBodyScroll } from "../../hooks/useBlockBodyScroll";
import { GameEvent } from "../../typings/event";

import { bevis } from "../../utils/bevis";
import s from "./EventsActionsSelect.module.css";

const b = bevis(s, "EventsActionsSelectModal");

export type EventsActionsSelectModalProps = {
  events: GameEvent[];
  initialSelectedEventsActions: string[];
  onSelect: (ids: string[]) => void;
  onClose: () => void;
};

export const EventsActionsSelectModal: FC<EventsActionsSelectModalProps> = ({
  events,
  initialSelectedEventsActions,
  onClose,
  onSelect,
}) => {
  const [selectedEventsActions, setSelectedEventsActions] = useState<string[]>(
    initialSelectedEventsActions
  );
  const [search, setSearch] = useState("");

  const searchWords = search.split(" ").filter(Boolean);

  const filteredEvents = events.filter(
    (event) =>
      searchWords.every((word) => event.title.includes(word)) ||
      searchWords.every((word) => event.description.includes(word)) ||
      event.actions.some(
        (action) =>
          searchWords.every((word) => action.title.includes(word)) ||
          searchWords.every((word) => action.description.includes(word))
      )
  );

  const handleSelect = (id: string) => {
    setSelectedEventsActions((prev) =>
      prev.includes(id)
        ? prev.filter((eventId) => eventId !== id)
        : [...prev, id]
    );
  };

  useBlockBodyScroll(true);

  const modalNode = (
    <div className={b("Container")}>
      <div className={b()}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск"
        />

        <div className={b("Events")}>
          {filteredEvents.map((event) => (
            <div key={event.id} className={b("Event")}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>

              <div className={b("Actions")}>
                {event.actions.map((action) => (
                  <div
                    key={action.id}
                    className={b("Action", {
                      selected: selectedEventsActions.includes(action.id),
                    })}
                    onClick={() => handleSelect(action.id)}
                  >
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={b("Actions")}>
          <button onClick={onClose}>Закрыть</button>

          <button onClick={() => onSelect(selectedEventsActions)}>
            Выбрать
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalNode, document.getElementById(PORTAL_ID)!);
};
