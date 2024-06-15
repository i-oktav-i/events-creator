import { Group } from "./groups";

type Dependencies = {
  timeRange: {
    min: number;
    max: number;
  };
  events: {
    required: string[];
    blocking: string[];
  };
  actions: {
    required: string[];
    blocking: string[];
  };
  state: Partial<
    Record<
      Group,
      {
        min: number;
        max: number;
      }
    >
  >;
};

export type GameEvent = {
  id: number;
  title: string;
  description: string;
  type: "weekly" | "weekend";
  fireIfPossible: boolean;
  actions: GameEventAction[];
  dependencies: Dependencies;
};

export type GameEventAction = {
  id: `${number}-${number}`;
  title: string;
  description: string;
  changes: Partial<Record<Group, number>>;
  dependencies: Dependencies;
};
