import {
  Dependencies,
  GameEvent,
  GameEventActionId,
  GameEventId,
  IdsDependenciesInfo,
} from '../types';

const updateIdsDependencies = <T extends string | number>(
  idsOffset: number,
  idsDependencies?: IdsDependenciesInfo<T>,
): IdsDependenciesInfo<T> | undefined => {
  if (!idsDependencies) return;

  return {
    ...idsDependencies,
    ids: idsDependencies.ids.map<T | IdsDependenciesInfo<T>>((dependency) => {
      if (typeof dependency === 'object')
        return updateIdsDependencies(idsOffset, dependency) as IdsDependenciesInfo<T>;

      if (typeof dependency === 'number') return (dependency + idsOffset) as T;

      const [gameEventId, actionId] = dependency.split('-');

      return `${+gameEventId + idsOffset}-${actionId}` as T;
    }),
  };
};

const updateDependencies = (
  idsOffset: number,
  dependencies?: Dependencies,
): Dependencies | undefined => {
  if (!dependencies) return;

  return {
    ...dependencies,
    events: {
      required: updateIdsDependencies(idsOffset, dependencies.events?.required),
      blocking: updateIdsDependencies(idsOffset, dependencies.events?.blocking),
    },
    actions: {
      required: updateIdsDependencies(idsOffset, dependencies.actions?.required),
      blocking: updateIdsDependencies(idsOffset, dependencies.actions?.blocking),
    },
  };
};

export const mergeGameEvents = (first: GameEvent[], second: GameEvent[]) => {
  const maxId = Math.max(...first.map((gameEvent) => gameEvent.id));

  const gameEventsIdOffset = maxId + 1;

  const mappedSecond = second.map<GameEvent>((gameEvent) => {
    const newId = gameEvent.id + gameEventsIdOffset;

    return {
      ...gameEvent,
      id: newId as GameEventId,
      actions: gameEvent.actions.map((action) => ({
        ...action,
        id: `${newId}-${action.id.split('-').at(-1)}` as GameEventActionId,
        dependencies: updateDependencies(gameEventsIdOffset, action.dependencies),
      })),
      dependencies: updateDependencies(gameEventsIdOffset, gameEvent.dependencies),
    };
  });

  return [...first, ...mappedSecond];
};
