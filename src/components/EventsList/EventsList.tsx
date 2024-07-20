import { FC, useEffect, useMemo, useState } from 'react';

import _debounce from 'lodash/debounce';

import { GameEvent } from '../../typings/event';

import { eventsSearch } from '../../utils/eventsSearch';

import * as s from './EventsList.css';

export type EventsListProps = {
  events: GameEvent[];
  onEventClick: (event: GameEvent) => void;
  onEventContextMenu: (event: GameEvent) => void;
};

export const EventsList: FC<EventsListProps> = ({ events, onEventClick, onEventContextMenu }) => {
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  const filterEvents = useMemo(
    () =>
      _debounce(
        (gameEvents: GameEvent[], search: string) => {
          setFilteredEvents(eventsSearch(gameEvents, search));
        },
        500,
        { trailing: true },
      ),
    [],
  );

  useEffect(() => filterEvents(events, search), [search, filterEvents, events]);

  return (
    <div className={s.eventsList}>
      <input
        className={s.eventsListSearch}
        placeholder="Search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className={s.eventsListScroll}>
        {filteredEvents.map((gameEvent) => (
          <button
            key={gameEvent.id}
            onClick={() => onEventClick(gameEvent)}
            onContextMenu={(event) => {
              event.preventDefault();
              onEventContextMenu(gameEvent);
            }}
          >
            <h2>{gameEvent.title}</h2>
            <p>{gameEvent.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
