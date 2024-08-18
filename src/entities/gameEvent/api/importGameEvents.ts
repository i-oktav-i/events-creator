import { loadFromFile, safeJsonParse } from '@shared/lib';

import { EVENTS_VERSION } from '../config';
import { StoredData } from '../types';
import { uploadGameEvents } from './uploadGameEvents';

export const importGameEvents = async () => {
  const readResult = await loadFromFile('application/json');

  if (typeof readResult !== 'string') throw new Error('Not a string file');

  const readEvents = safeJsonParse<StoredData>(readResult, { version: 0, events: [] });

  if (readEvents.version !== EVENTS_VERSION) return;

  uploadGameEvents(readEvents.events);

  return readEvents.events;
};
