import { saveToFile } from '@shared/lib';

import { loadGameEvents } from './loadGameEvents';

export const exportGameEvents = () => {
  saveToFile(JSON.stringify(loadGameEvents()), 'gameEvents.json', 'application/json');
};
