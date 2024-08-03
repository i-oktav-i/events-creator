import _inRange from 'lodash/inRange';

import { Dependencies, GameEvent, GameState, Group } from '@entities/gameEvent';
import { UnionToTuple } from '@shared/typings';

const allGroupsAndTimeRange: UnionToTuple<Group | 'week'> = ['group1', 'group2', 'week'];

const getEvents = (state: GameState, events: GameEvent[], type: GameEvent['type'], count = 5) => {
  const filterDependenciesPredicate = (dependencies: Dependencies) => {
    const satisfyState = allGroupsAndTimeRange.every((fieldName) => {
      const field = dependencies?.state?.[fieldName];
      if (!field) return true;

      if (!field.max) return state[fieldName] >= field.min;

      return _inRange(state[fieldName], field.min, field.max);
    });

    if (!satisfyState) return false;

    const { happenedEventsIds, chosenActionIds } = state;

    const requiredEvents = dependencies?.events?.required;
    const blockingEvents = dependencies?.events?.blocking;
    const requiredActions = dependencies?.actions?.required;
    const blockingActions = dependencies?.actions?.blocking;

    if (requiredEvents && !requiredEvents.every((id) => happenedEventsIds.includes(id)))
      return false;

    if (blockingEvents && blockingEvents.some((id) => happenedEventsIds.includes(id))) return false;
    if (requiredActions && !requiredActions.every((id) => chosenActionIds.includes(id)))
      return false;
    if (blockingActions && blockingActions.some((id) => chosenActionIds.includes(id))) return false;

    return true;
  };

  const availableEvents = events.filter(({ id, type: eventType, dependencies }) => {
    if (eventType !== type) return false;

    const { happenedEventsIds } = state;

    if (happenedEventsIds.includes(id)) return false;

    if (!dependencies) return true;

    return filterDependenciesPredicate(dependencies);
  });

  availableEvents.sort((first, second) => {
    if (first.fireIfPossible === second.fireIfPossible) return Math.random() > 0.5 ? 1 : -1;

    return first.fireIfPossible ? 1 : -1;
  });

  const eventsSet = availableEvents.slice(0, count);

  return eventsSet.map((event) => {
    return {
      ...event,
      actions: event.actions.filter(({ dependencies }) => {
        if (!dependencies) return true;

        return filterDependenciesPredicate(dependencies);
      }),
    };
  });
};

export const getWeeklyEvents = (state: GameState, events: GameEvent[], count = 5) =>
  getEvents(state, events, 'weekly', count);

export const getWeekendEvents = (state: GameState, events: GameEvent[], count = 5) =>
  getEvents(state, events, 'weekend', count);
