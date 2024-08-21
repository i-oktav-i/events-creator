import { saveToFile } from '@shared/lib';

import { EVENTS_LOCAL_STORAGE_KEY } from '../config';

export const exportGameEvents = () => {
  saveToFile(
    localStorage.getItem(EVENTS_LOCAL_STORAGE_KEY) || '',
    'gameEvents.json',
    'application/json',
  );
};
