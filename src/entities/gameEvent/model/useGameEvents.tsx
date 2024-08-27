import { useEffect, useState } from 'react';
import { gameEventsClient } from './GameEventsClient';

export const useGameEvents = () => {
  const [gameEvents, setGameEvents] = useState(gameEventsClient.events);

  useEffect(() => gameEventsClient.subscribe(setGameEvents), []);

  return {
    gameEvents,
    addGameEvent: gameEventsClient.addGameEvent,
    updateGameEvent: gameEventsClient.updateGameEvent,
    removeGameEvent: gameEventsClient.removeGameEvent,
    findGameEvent: gameEventsClient.findGameEvent,
    findGameEventAction: gameEventsClient.findGameEventAction,
    getNewEventBase: gameEventsClient.getNewEventBase,
  };
};
