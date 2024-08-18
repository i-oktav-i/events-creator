import { GameEvent } from './event';

export type StoredData = {
  version: number;
  events: GameEvent[];
};
