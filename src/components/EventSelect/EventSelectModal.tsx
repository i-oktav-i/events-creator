import { FC, useState } from 'react';

import { createPortal } from 'react-dom';

import { GameEvent } from '../../typings/event';

import { PORTAL_ID } from '../../constants';
import { useBlockBodyScroll } from '../../hooks/useBlockBodyScroll';

import { eventsSearch } from '../../utils/eventsSearch';

import * as s from './EventSelect.css';

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
  const [search, setSearch] = useState('');

  const filteredEvents = eventsSearch(events, search);

  const handleSelect = (id: number) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id],
    );
  };

  useBlockBodyScroll(true);

  const modalNode = (
    <div className={s.eventSelectModalContainer}>
      <div className={s.eventSelectModal}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск"
        />
        <div className={s.eventSelectModalEvents}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={s.eventSelectModalEvent({
                selected: selectedEvents.includes(event.id),
              })}
              onClick={() => handleSelect(event.id)}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
        <div>
          <button onClick={onClose}>Закрыть</button>
          <button onClick={() => onSelect(selectedEvents)}>Выбрать</button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalNode, document.getElementById(PORTAL_ID)!);
};
