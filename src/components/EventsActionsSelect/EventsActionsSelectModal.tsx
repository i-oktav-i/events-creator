import { FC, useState } from 'react';
import { createPortal } from 'react-dom';

import { GameEvent, eventsSearch } from '@entities/gameEvent';
import { PORTAL_ID } from '@shared/config';

import { useBlockBodyScroll } from '@shared/hooks';

import * as s from './EventsActionsSelect.css';

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
    initialSelectedEventsActions,
  );
  const [search, setSearch] = useState('');

  const filteredEvents = eventsSearch(events, search, true);

  const handleSelect = (id: string) => {
    setSelectedEventsActions((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id],
    );
  };

  useBlockBodyScroll(true);

  const modalNode = (
    <div className={s.eventsActionsSelectModalContainer}>
      <div className={s.eventsActionsSelectModal}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск"
        />

        <div className={s.eventsActionsSelectModalEvents}>
          {filteredEvents.map((event) => (
            <div key={event.id} className={s.eventsActionsSelectModalEvent}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>

              <div className={s.eventsActionsSelectModalActions}>
                {event.actions.map((action) => (
                  <div
                    key={action.id}
                    className={s.eventsActionsSelectModalAction({
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

        <div>
          <button onClick={onClose}>Закрыть</button>

          <button onClick={() => onSelect(selectedEventsActions)}>Выбрать</button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalNode, document.getElementById(PORTAL_ID)!);
};
