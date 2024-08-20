import { FC, MouseEventHandler, ReactNode } from 'react';
import { GameEvent, GameEventAction } from '../../types';
import { cardContainer, gameEventDescription, gameEventTitle } from './ItemCard.css';

export type ItemCardProps = {
  item: GameEvent | GameEventAction;
  onClick?: () => void;
  as: 'button' | 'text';
  bottomSlot?: ReactNode;
  active?: boolean;
};

export const ItemCard: FC<ItemCardProps> = ({ item, as, bottomSlot, active, onClick }) => {
  const isButton = as === 'button';
  const RootComponent = isButton ? 'button' : 'div';
  const rootProps = isButton ? { type: 'button' as const } : {};

  const handelClick: MouseEventHandler = (event) => {
    event.preventDefault();
    onClick?.();
  };

  return (
    <RootComponent {...rootProps} onClick={handelClick} className={cardContainer({ active })}>
      <span className={gameEventTitle}>{item.title}</span>

      <span className={gameEventDescription}>{item.description}</span>

      {bottomSlot}
    </RootComponent>
  );
};
