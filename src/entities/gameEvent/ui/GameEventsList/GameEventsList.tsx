import { FC } from 'react';

import { OneOrArray } from '@shared/typings';

import { GameEvent, GameEventId } from '../../types';
import { ItemCard } from '../ItemCard';

import { listContainer } from './GameEventsList.css';

export type GameEventsListProps = {
  gameEvents: GameEvent[];
  onClick?: (gameEvent: GameEvent) => void;
  activeGameEventId?: OneOrArray<GameEventId>;
};

export const GameEventsList: FC<GameEventsListProps> = ({
  gameEvents,
  activeGameEventId,
  onClick,
}) => {
  const idsArray = Array.isArray(activeGameEventId) ? activeGameEventId : [activeGameEventId];

  return (
    <ul className={listContainer}>
      {gameEvents.map((gameEvent) => (
        <li key={gameEvent.id}>
          <ItemCard
            as="button"
            item={gameEvent}
            active={idsArray.includes(gameEvent.id)}
            onClick={() => onClick?.(gameEvent)}
          />
        </li>
      ))}
    </ul>
  );
};
