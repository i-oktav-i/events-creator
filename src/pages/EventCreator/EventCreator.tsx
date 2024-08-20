import { FC, useMemo, useState } from 'react';

import { GameEvent, GameEventId, GameEventsList, useGameEvents } from '@entities/gameEvent';
import { SearchGameEvents } from '@features/gameEvent';
import { GameEventForm } from '@widgets/gameEvent';

import { listContainer, pageContainer } from './EventCreator.css';

export const EventCreator: FC = () => {
  const [selectedGameEvent, setSelectedGameEvent] = useState<
    GameEvent | Pick<GameEvent, 'id'> | null
  >(null);

  const { gameEvents, addGameEvent, updateGameEvent } = useGameEvents();

  const newGameEventBase = useMemo(() => {
    const maxId = gameEvents.length ? Math.max(...gameEvents.map((gameEvent) => gameEvent.id)) : 0;

    const newGameEventId = (maxId + 1) as GameEventId;

    return { id: newGameEventId };
  }, [gameEvents]);

  const onFormSubmit = (gameEvent: GameEvent) => {
    const formSubmitAction = selectedGameEvent ? updateGameEvent : addGameEvent;
    formSubmitAction(gameEvent);
    setSelectedGameEvent(null);
  };

  return (
    <div className={pageContainer}>
      <div className={listContainer({ hidden: !!selectedGameEvent })}>
        <button onClick={() => setSelectedGameEvent(newGameEventBase)}>
          Create new game event
        </button>

        <SearchGameEvents gameEvents={gameEvents}>
          {(filteredGameEvents) => (
            <GameEventsList
              gameEvents={filteredGameEvents}
              onClick={setSelectedGameEvent}
              activeGameEventId={selectedGameEvent?.id}
            />
          )}
        </SearchGameEvents>
      </div>

      {selectedGameEvent ? (
        <GameEventForm
          key={selectedGameEvent.id}
          onSubmit={onFormSubmit}
          defaultValues={selectedGameEvent}
          onAbort={() => setSelectedGameEvent(null)}
        />
      ) : null}
    </div>
  );
};
