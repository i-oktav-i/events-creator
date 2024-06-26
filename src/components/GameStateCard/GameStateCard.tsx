import { FC } from "react";

import { GameState } from "../../typings/state";

import { bevis } from "../../utils/bevis";
import { Group } from "../../typings/groups";

import s from "./GameStateCard.module.css";

const b = bevis(s, "GameStateCard");

export type GameStateCardProps = {
  state: GameState;
};

type StateKeys = Group | "week";

const statePartsOrder: {
  [K in StateKeys]: { key: K; label: string };
}[StateKeys][] = [
  { key: "week", label: "Номер недели" },
  { key: "group1", label: "Влияние группы 1" },
  { key: "group2", label: "Влияние группы 2" },
];

export const GameStateCard: FC<GameStateCardProps> = ({ state }) => {
  return (
    <div className={b()}>
      {statePartsOrder.map(({ key, label }) => (
        <span key={key} className={b("Item")}>
          <span className={b("ItemTitle")}>{label}:</span>
          <span className={b("ItemValue")}>{state[key]}</span>
        </span>
      ))}
      <span>Сейчас {state.isWeekend ? "выходные" : "будни"}</span>
    </div>
  );
};
