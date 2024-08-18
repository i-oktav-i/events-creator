import { EVENTS_LOCAL_STORAGE_KEY, EVENTS_VERSION } from '../config';
import { GameEvent } from '../types';

export const uploadGameEvents = (gameEvents: GameEvent[]) => {
  localStorage.setItem(
    EVENTS_LOCAL_STORAGE_KEY,
    JSON.stringify({ version: EVENTS_VERSION, events: gameEvents }),
  );
};
