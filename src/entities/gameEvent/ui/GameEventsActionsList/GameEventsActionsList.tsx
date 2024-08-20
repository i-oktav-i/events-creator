import { FC } from 'react';

import { OneOrArray } from '@shared/typings';

import { GameEvent, GameEventAction, GameEventActionId } from '../../types';
import { ItemCard } from '../ItemCard';

import { listContainer } from './GameEventsActionsList.css';

export type GameEventsActionsListProps = {
  gameEvents: GameEvent[];
  onClick?: (gameEventAction: GameEventAction) => void;
  activeGameEventActionsId?: OneOrArray<GameEventActionId>;
};

export const GameEventsActionsList: FC<GameEventsActionsListProps> = ({
  gameEvents,
  activeGameEventActionsId,
  onClick,
}) => {
  const idsArray = Array.isArray(activeGameEventActionsId)
    ? activeGameEventActionsId
    : [activeGameEventActionsId];

  return (
    <ul className={listContainer}>
      {gameEvents.map((gameEvent) => (
        <li key={gameEvent.id}>
          <ItemCard
            as="text"
            item={gameEvent}
            bottomSlot={gameEvent.actions.map((action) => (
              <ItemCard
                key={action.id}
                item={action}
                as="button"
                active={idsArray.includes(action.id)}
                onClick={() => onClick?.(action)}
              />
            ))}
          />
        </li>
      ))}
    </ul>
  );
};
