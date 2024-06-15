import { EVENTS_LOCAL_STORAGE_KEY } from "../constants";
import { GameEvent } from "../typings/event";

export const getEventsFromLocalStorage = (): GameEvent[] => {
  const data = localStorage.getItem(EVENTS_LOCAL_STORAGE_KEY);
  if (data) return JSON.parse(data);

  return [];
};

export const saveEventsToLocalStorage = (events: GameEvent[]) => {
  localStorage.setItem(EVENTS_LOCAL_STORAGE_KEY, JSON.stringify(events));
};
