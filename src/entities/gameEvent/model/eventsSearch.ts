import { GameEvent } from '../types';

export const eventsSearch = (events: GameEvent[], search: string, checkActions = false) => {
  const words = search.split(' ');

  if (words.length === 0) return events;

  return events
    .map((event) => {
      const concated = `${event.title} ${event.description} ${
        checkActions ? event.actions.map((action) => `${action.title} ${action.description}`) : ''
      }`;

      const matchesCount = words
        .map((word) => (concated.match(new RegExp(word, 'i')) ?? []).length)
        .reduce((memo, item) => memo + item, 0);

      return [event, matchesCount] as const;
    })
    .filter(([, matchesCount]) => !!matchesCount)
    .sort(([, leftMatchesCount], [, rightMatchesCount]) => rightMatchesCount - leftMatchesCount)
    .map(([event]) => event);
};
