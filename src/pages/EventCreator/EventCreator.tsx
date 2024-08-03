import { useEffect, useMemo, useRef, useState } from 'react';

import { GameEvent, gameEventsClient } from '@entities/gameEvent';
import { combineRefs } from '@shared/lib';

import { EventForm } from '../../components/EventForm';
import { EventsList } from '../../components/EventsList';

import * as s from './EventCreator.css';

export const EventCreator = () => {
  const [events, setEvents] = useState<GameEvent[]>(gameEventsClient.events);

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [eventCreation, setEventCreation] = useState(false);
  const popoverNodeRef = useRef<HTMLDivElement>(null);
  const popoverInvokerIdRef = useRef<number | null>(null);

  const selectedEvent = selectedEventId
    ? events.find((event) => event.id === selectedEventId)
    : undefined;

  const maxEventId = useMemo(() => Math.max(0, ...events.map((event) => event.id)), [events]);

  const popoverRef = combineRefs(popoverNodeRef, (node) =>
    node?.setAttribute('popover', 'popover'),
  );

  const handleEventClick = (gameEvent: GameEvent) => setSelectedEventId(gameEvent.id);

  const handleEventContextMenu = (gameEvent: GameEvent) => {
    popoverNodeRef.current?.showPopover();
    popoverInvokerIdRef.current = gameEvent.id;
  };

  const hidePopover = () => {
    popoverNodeRef.current?.hidePopover();
    popoverInvokerIdRef.current = null;
  };

  const deleteSelectedEvent = () => {
    gameEventsClient.events = gameEventsClient.events.filter(
      (event) => event.id !== popoverInvokerIdRef.current,
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

      gameEventsClient.events = [...gameEventsClient.events, value];

      setEventCreation(false);
    }

    if (selectedEventId) {
      gameEventsClient.events = gameEventsClient.events.map((event) =>
        event.id === selectedEventId ? value : event,
      );

      setSelectedEventId(null);
    }
  };

  const onAbort = () => {
    setEventCreation(false);
    setSelectedEventId(null);
  };

  useEffect(() => {
    if (selectedEvent) return;

    setSelectedEventId(null);
  }, [selectedEvent]);

  useEffect(() => {
    return gameEventsClient.subscribe(setEvents);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.search}>
        <EventsList
          events={events}
          onEventClick={handleEventClick}
          onEventContextMenu={handleEventContextMenu}
        />
      </div>

      <div className={s.popover} ref={popoverRef}>
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
        <div className={s.actionsContainer}>
          <button className={s.actionButton} onClick={() => setEventCreation(true)}>
            Создать
          </button>

          <button className={s.actionButton} onClick={gameEventsClient.exportEvents}>
            Сохранить
          </button>

          <button className={s.actionButton} onClick={gameEventsClient.importEvents}>
            Загрузить
          </button>
        </div>
      ) : null}
    </div>
  );
};
