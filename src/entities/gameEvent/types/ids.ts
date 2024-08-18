export type GameEventId = number & { tag: 'GameEventId' };
export type GameEventActionId = `${number}-${number}` & { tag: 'GameEventActionId' };
