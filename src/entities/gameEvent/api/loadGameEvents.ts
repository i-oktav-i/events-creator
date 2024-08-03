import { EVENTS_LOCAL_STORAGE_KEY } from '../config';
import { GameEvent } from '../types';

export const loadGameEvents = (): GameEvent[] => {
  const data = localStorage.getItem(EVENTS_LOCAL_STORAGE_KEY);

  if (data) return JSON.parse(data);

  return [];
};
