import { DeepPartial, TypedOmit } from '@shared/typings';

import { Dependencies } from './dependencies';
import { GameEventActionId, GameEventId } from './ids';
import { GameState } from './state';

export type GameEventType = 'weekly' | 'weekend' | 'chain' | 'fullWeek';

export type GameEvent = {
  id: GameEventId;
  type: GameEventType;

  title: string;
  description: string;

  actions: GameEventAction[];

  dependencies?: Dependencies;

  triggerProbability: number;
  checksAttempts?: number;

  allowOverStack?: boolean;

  isСutscene?: boolean;
};

export type GameEventActionChanges = DeepPartial<
  TypedOmit<GameState, 'chosenActionIds' | 'happenedEventsIds' | 'week' | 'eventsType'>
>;

export type GameEventAction = {
  id: GameEventActionId;

  title: string;
  description: string;

  chainedEvent?: GameEventId;

  dependencies?: Dependencies;

  changes?: GameEventActionChanges;
};

export type UnknownGameEvent = TypedOmit<GameEvent, 'id' | 'actions'> & {
  actions: TypedOmit<GameEventAction, 'id'>[];
};
