import { FC, useState } from "react";
import { GameEvent } from "../../typings/event";

import { createPortal } from "react-dom";
import { PORTAL_ID } from "../../constants";
import { useBlockBodyScroll } from "../../hooks/useBlockBodyScroll";
import { bevis } from "../../utils/bevis";
import s from "./EventSelect.module.css";
import { eventsSearch } from "../../utils/eventsSearch";

const b = bevis(s, "EventSelectModal");

export type EventSelectModalProps = {
  events: GameEvent[];
  initialSelectedEvents: number[];
  onSelect: (ids: number[]) => void;
  onClose: () => void;
};

export const EventSelectModal: FC<EventSelectModalProps> = ({
  events,
  initialSelectedEvents,
  onClose,
  onSelect,
}) => {
  const [selectedEvents, setSelectedEvents] = useState(initialSelectedEvents);
  const [search, setSearch] = useState("");

  const filteredEvents = eventsSearch(events, search);

  const handleSelect = (id: number) => {
    setSelectedEvents((prev) =>
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
            <div
              key={event.id}
              className={b("Event", {
                selected: selectedEvents.includes(event.id),
              })}
              onClick={() => handleSelect(event.id)}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
        <div className={b("Actions")}>
          <button onClick={onClose}>Закрыть</button>
          <button onClick={() => onSelect(selectedEvents)}>Выбрать</button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalNode, document.getElementById(PORTAL_ID)!);
};
