import { GameEventType } from './event';
import { Fraction, FractionsState } from './fractions';
import { GameEventActionId, GameEventId } from './ids';

export type GameState = {
  week: number;
  happenedEventsIds: GameEventId[];
  chosenActionIds: GameEventActionId[];
  eventsType: GameEventType;
  fractionsState: FractionsState;
  publishingHouseReputation: number;
  money: number;
  policeAttention: number;
} & Record<`${Fraction}Reputation`, number>;
