import { FC } from 'react';

import { GameEvent, GameEventAction } from '@entities/gameEvent';

import * as s from './EventCard.css';

export type EventCardProps = {
  event: GameEvent;
  onActionSelect: (id: GameEventAction) => void;
};

export const EventCard: FC<EventCardProps> = ({ event, onActionSelect }) => {
  return (
    <div className={s.eventCard}>
      <h2>{event.title}</h2>

      <p>{event.description}</p>

      <div className={s.eventCardActions}>
        {event.actions.map((action) => (
          <button
            key={action.id}
            className={s.eventCardAction}
            onClick={() => onActionSelect(action)}
          >
            <span>{action.title}</span>

            <span>{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
