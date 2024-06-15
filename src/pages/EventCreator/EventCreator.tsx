import { useEffect, useMemo, useRef, useState } from "react";
import { EventForm } from "../../components/EventForm";
import { EventsList } from "../../components/EventsList";
import { GameEvent } from "../../typings/event";
import { bevis } from "../../utils/bevis";
import { combineRefs } from "../../utils/combineRefs";
import s from "./EventCreator.module.css";

const LOCAL_STORAGE_KEY = "events";

const getFromLocalStorage = (): GameEvent[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) return JSON.parse(data);

  return [];
};

const saveToLocalStorage = (events: GameEvent[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
};

const b = bevis(s, "EventCreator");

export const EventCreator = () => {
  const [events, setEvents] = useState<GameEvent[]>(getFromLocalStorage());
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

  useEffect(() => saveToLocalStorage(events), [events]);

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
          onSave={(value) => {
            console.log("value", value);
            if (eventCreation) {
              value.id = maxEventId + 1;

              value.actions = value.actions.map((action, index) => ({
                ...action,
                id: `${value.id}-${index}`,
              }));

              setEvents((current) => [...current, value]);

              setEventCreation(false);
            }

            if (selectedEventId) {
              setEvents((current) =>
                current.map((event) =>
                  event.id === selectedEventId ? value : event
                )
              );
              setSelectedEventId(null);
            }
          }}
          onAbort={() => {
            setEventCreation(false);
            setSelectedEventId(null);
          }}
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
