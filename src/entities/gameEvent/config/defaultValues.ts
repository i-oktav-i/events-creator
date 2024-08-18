import { UnknownGameEvent } from '../types';

export const unknownGameEvent: UnknownGameEvent = {
  type: 'weekly',
  title: '',
  description: '',
  actions: [],
  triggerProbability: 1,
  checksAttempts: 1,
  allowOverStack: false,
};

export const unknownGameEventAction: UnknownGameEvent['actions'][number] = {
  description: '',
  title: '',
};
