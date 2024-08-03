import { EVENTS_LOCAL_STORAGE_KEY } from '../config';
import { GameEvent } from '../types';

export const uploadGameEvents = (gameEvents: GameEvent[]) => {
  localStorage.setItem(EVENTS_LOCAL_STORAGE_KEY, JSON.stringify(gameEvents));
};
