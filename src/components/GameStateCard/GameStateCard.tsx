import { FC } from 'react';

import { GameState } from '../../typings/state';

import { Group } from '../../typings/groups';

import * as s from './GameStateCard.css';

export type GameStateCardProps = {
  state: GameState;
};

type StateKeys = Group | 'week';

const statePartsOrder: {
  [K in StateKeys]: { key: K; label: string };
}[StateKeys][] = [
  { key: 'week', label: 'Номер недели' },
  { key: 'group1', label: 'Влияние группы 1' },
  { key: 'group2', label: 'Влияние группы 2' },
];

export const GameStateCard: FC<GameStateCardProps> = ({ state }) => {
  return (
    <div className={s.gameStateCard}>
      {statePartsOrder.map(({ key, label }) => (
        <span key={key} className={s.gameStateCardItem}>
          <span>{label}:</span>

          <span>{state[key]}</span>
        </span>
      ))}

      <span>Сейчас {state.isWeekend ? 'выходные' : 'будни'}</span>
    </div>
  );
};
