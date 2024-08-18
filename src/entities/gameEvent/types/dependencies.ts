import { AnyObject, DeepPartial, TypedOmit } from '@shared/typings';
import { GameEventActionId, GameEventId } from './ids';
import { GameState } from './state';

type StateToDependencies<T extends AnyObject> = {
  [Key in keyof T]: T[Key] extends number
    ? {
        min: number;
        max: number;
      }
    : T[Key] extends string
      ? T[Key]
      : T[Key] extends AnyObject
        ? StateToDependencies<T[Key]>
        : never;
};

export type IdsDependenciesInfo<IdType extends string | number> = {
  type: 'all' | 'any';
  ids: (IdType | IdsDependenciesInfo<IdType>)[];
};

export type Dependencies = {
  events?: {
    required?: IdsDependenciesInfo<GameEventId>;
    blocking?: IdsDependenciesInfo<GameEventId>;
  };
  actions?: {
    required?: IdsDependenciesInfo<GameEventActionId>;
    blocking?: IdsDependenciesInfo<GameEventActionId>;
  };
  state?: DeepPartial<
    StateToDependencies<
      TypedOmit<GameState, 'chosenActionIds' | 'happenedEventsIds' | 'eventsType'>
    > &
      Record<
        'week',
        {
          min: number;
          max: number;
        }
      >
  >;
};
