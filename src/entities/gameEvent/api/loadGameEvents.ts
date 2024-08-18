import { safeJsonParse } from '@shared/lib';

import { EVENTS_LOCAL_STORAGE_KEY, EVENTS_VERSION } from '../config';
import { GameEvent, StoredData } from '../types';
import { uploadGameEvents } from './uploadGameEvents';

export const loadGameEvents = (): GameEvent[] => {
  const stringifiedData = localStorage.getItem(EVENTS_LOCAL_STORAGE_KEY);

  if (!stringifiedData) return [];
  const data = safeJsonParse<StoredData>(stringifiedData, { version: 0, events: [] });

  if (data.version === EVENTS_VERSION) return data.events;

  uploadGameEvents([]);

  return [];
};
