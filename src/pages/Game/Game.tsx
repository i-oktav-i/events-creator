import { FC, useEffect, useState } from "react";

import { EventCard } from "../../components/EventCard";
import { GameEvent, GameEventAction } from "../../typings/event";
import { GameState } from "../../typings/state";
import { getWeekendEvents, getWeeklyEvents } from "../../utils/game";
import { gameEventsClient } from "../../utils/GameEventsClient";
import { GameStateCard } from "../../components/GameStateCard";

export const Game: FC = () => {
  const [events, setEvents] = useState<GameEvent[]>(gameEventsClient.events);
  const [gameState, setGameState] = useState<GameState>({
    group1: 0,
    group2: 0,
    week: 0,
    chosenActionIds: [],
    happenedEventsIds: [],
    isWeekend: false,
  });

  const [currentEvents, setCurrentEvents] = useState<GameEvent[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const startNextEvents = () => {
    const nextEventsGetter = gameState.isWeekend
      ? getWeeklyEvents
      : getWeekendEvents;

    setCurrentEvents(nextEventsGetter(gameState, events));
    setGameState({
      ...gameState,
      isWeekend: !gameState.isWeekend,
      week: gameState.week + (gameState.isWeekend ? 1 : 0),
    });
    setCurrentEventIndex(0);
  };

  const onActionSelect = (action: GameEventAction) => {
    setGameState((current) => ({
      ...current,
      group1: Math.max(current.group1 + (action.changes.group1 ?? 0), 0),
      group2: Math.max(current.group2 + (action.changes.group2 ?? 0), 0),
      chosenActionIds: [...current.chosenActionIds, action.id],
    }));

    setCurrentEventIndex((current) => current + 1);
  };

  useEffect(() => {
    const eventsGetter = gameState.isWeekend
      ? getWeekendEvents
      : getWeeklyEvents;

    const newEvents = eventsGetter(gameState, events);

    setGameState((current) => ({
      ...current,
      happenedEventsIds: [
        ...current.happenedEventsIds,
        ...newEvents.map((event) => event.id),
      ],
    }));
    setCurrentEvents(newEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, gameState.isWeekend]);

  useEffect(() => gameEventsClient.subscribe(setEvents), []);

  const getContentNode = () => {
    if (currentEventIndex === currentEvents.length || !currentEvents.length) {
      return (
        <div onClick={startNextEvents}>
          {currentEventIndex === 0 ? <span>Нет подходящих событий</span> : null}

          <button>Начать {gameState.isWeekend ? "неделю" : "выходные"}</button>
        </div>
      );
    }

    const currentEvent = currentEvents[currentEventIndex];

    return (
      <EventCard
        key={currentEvent.id}
        event={currentEvent}
        onActionSelect={onActionSelect}
      />
    );
  };

  return (
    <div>
      <GameStateCard state={gameState} />
      {getContentNode()}
    </div>
  );
};
