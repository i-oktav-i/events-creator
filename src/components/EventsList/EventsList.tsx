import { FC, useEffect, useMemo, useState } from "react";
import { GameEvent } from "../../typings/event";

import _debounce from "lodash/debounce";

import { bevis } from "../../utils/bevis";
import s from "./EventsList.module.css";
import { eventsSearch } from "../../utils/eventsSearch";

const b = bevis(s, "EventsList");

export type EventsListProps = {
  events: GameEvent[];
  onEventClick: (event: GameEvent) => void;
  onEventContextMenu: (event: GameEvent) => void;
};

export const EventsList: FC<EventsListProps> = ({
  events,
  onEventClick,
  onEventContextMenu,
}) => {
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const filterEvents = useMemo(
    () =>
      _debounce(
        (gameEvents: GameEvent[], search: string) => {
          setFilteredEvents(eventsSearch(gameEvents, search));
        },
        500,
        { trailing: true }
      ),
    []
  );

  useEffect(() => filterEvents(events, search), [search, filterEvents, events]);

  return (
    <div className={b()}>
      <input
        className={b("Search")}
        placeholder="Search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className={b("Scroll")}>
        {filteredEvents.map((gameEvent) => (
          <button
            key={gameEvent.id}
            className={b("Event")}
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
