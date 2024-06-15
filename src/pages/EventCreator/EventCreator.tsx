import { useEffect, useMemo, useRef, useState } from "react";

import { EventForm } from "../../components/EventForm";
import { EventsList } from "../../components/EventsList";
import { GameEvent } from "../../typings/event";
import { bevis } from "../../utils/bevis";
import { combineRefs } from "../../utils/combineRefs";

import {
  getEventsFromLocalStorage,
  saveEventsToLocalStorage,
} from "../../utils/localStorage";

import s from "./EventCreator.module.css";

const b = bevis(s, "EventCreator");

export const EventCreator = () => {
  const [events, setEvents] = useState<GameEvent[]>(
    getEventsFromLocalStorage()
  );
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [eventCreation, setEventCreation] = useState(false);
  const popoverNodeRef = useRef<HTMLDivElement>(null);
  const popoverInvokerIdRef = useRef<number | null>(null);

  const selectedEvent = selectedEventId
    ? events.find((event) => event.id === selectedEventId)
    : undefined;

  const maxEventId = useMemo(
    () => Math.max(0, ...events.map((event) => event.id)),
    [events]
  );

  const popoverRef = combineRefs(popoverNodeRef, (node) =>
    node?.setAttribute("popover", "popover")
  );

  const handleEventClick = (gameEvent: GameEvent) =>
    setSelectedEventId(gameEvent.id);

  const handleEventContextMenu = (gameEvent: GameEvent) => {
    popoverNodeRef.current?.showPopover();
    popoverInvokerIdRef.current = gameEvent.id;
  };

  const hidePopover = () => {
    popoverNodeRef.current?.hidePopover();
    popoverInvokerIdRef.current = null;
  };

  const deleteSelectedEvent = () => {
    setEvents((current) =>
      current.filter((event) => event.id !== popoverInvokerIdRef.current)
    );
    hidePopover();
  };

  const onSave = (value: GameEvent) => {
    if (eventCreation) {
      value.id = maxEventId + 1;

      value.actions = value.actions.map((action, index) => ({
        ...action,
        id: `${value.id}-${index}` as const,
      }));

      setEvents((current) => [...current, value]);

      setEventCreation(false);
    }

    if (selectedEventId) {
      setEvents((current) =>
        current.map((event) => (event.id === selectedEventId ? value : event))
      );
      setSelectedEventId(null);
    }
  };

  const onAbort = () => {
    setEventCreation(false);
    setSelectedEventId(null);
  };

  useEffect(() => saveEventsToLocalStorage(events), [events]);

  useEffect(() => {
    if (selectedEvent) return;

    setSelectedEventId(null);
  }, [selectedEvent]);

  return (
    <div className={b()}>
      <div className={b("Search")}>
        <EventsList
          events={events}
          onEventClick={handleEventClick}
          onEventContextMenu={handleEventContextMenu}
        />
      </div>

      <div className={b("Popover")} ref={popoverRef}>
        <button autoFocus onClick={deleteSelectedEvent}>
          Удалить
        </button>

        <button onClick={hidePopover}>Отмена</button>
      </div>

      {eventCreation || selectedEvent ? (
        <EventForm
          key={selectedEventId}
          events={events}
          initValues={selectedEvent}
          onSave={onSave}
          onAbort={onAbort}
        />
      ) : null}

      {!eventCreation && !selectedEvent ? (
        <button
          className={b("CreateButton")}
          onClick={() => setEventCreation(true)}
        >
          Создать
        </button>
      ) : null}
    </div>
  );
};
