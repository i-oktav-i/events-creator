import { Group } from "./groups";

export type GameEventId = number & {};
export type GameEventActionId = `${number}-${number}` & {};

export type Dependencies = {
  events?: {
    required?: GameEventId[];
    blocking?: GameEventId[];
  };
  actions?: {
    required?: GameEventActionId[];
    blocking?: GameEventActionId[];
  };
  state?: Partial<
    Record<
      Group | "week",
      {
        min: number;
        max: number;
      }
    >
  >;
};

export type GameEventType = "weekly" | "weekend";

export type GameEvent = {
  id: GameEventId;
  title: string;
  description: string;
  type: GameEventType;
  fireIfPossible: boolean;
  actions: GameEventAction[];
  dependencies?: Dependencies;
};

export type GameEventAction = {
  id: GameEventActionId;
  title: string;
  description: string;
  changes: Partial<Record<Group, number>>;
  dependencies: Dependencies;
};
