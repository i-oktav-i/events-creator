import { FC } from "react";

import { GameEvent, GameEventAction } from "../../typings/event";
import { bevis } from "../../utils/bevis";

import s from "./EventCard.module.css";

const b = bevis(s, "EventCard");

export type EventCardProps = {
  event: GameEvent;
  onActionSelect: (id: GameEventAction) => void;
};

export const EventCard: FC<EventCardProps> = ({ event, onActionSelect }) => {
  return (
    <div className={b()}>
      <h2>{event.title}</h2>

      <p>{event.description}</p>

      <div className={b("Actions")}>
        {event.actions.map((action) => (
          <button
            key={action.id}
            className={b("Action")}
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
