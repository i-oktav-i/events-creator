import { GameEventActionId, GameEventId } from './event';
import { Group } from './groups';

export type GameState = Record<Group | 'week', number> & {
  happenedEventsIds: GameEventId[];
  chosenActionIds: GameEventActionId[];
  isWeekend: boolean;
};
