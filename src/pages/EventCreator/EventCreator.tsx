import { FC, useMemo, useState } from 'react';

import { GameEvent, GameEventId, GameEventsList, useGameEvents } from '@entities/gameEvent';
import { ExportEventsButton, ImportEventsButton, SearchGameEvents } from '@features/gameEvent';
import { GameEventForm } from '@widgets/gameEvent';

import { MergeGameEventsButton } from '@features/gameEvent/ui/MergeGameEventsButton';
import { locale } from '@shared/locale';
import { listContainer, pageContainer } from './EventCreator.css';

export const EventCreator: FC = () => {
  const [selectedGameEvent, setSelectedGameEvent] = useState<
    GameEvent | Pick<GameEvent, 'id'> | null
  >(null);

  const { gameEvents, updateGameEvent } = useGameEvents();

  const newGameEventBase = useMemo(() => {
    const maxId = gameEvents.length ? Math.max(...gameEvents.map((gameEvent) => gameEvent.id)) : 0;

    const newGameEventId = (maxId + 1) as GameEventId;

    return { id: newGameEventId };
  }, [gameEvents]);

  const onFormSubmit = (gameEvent: GameEvent) => {
    updateGameEvent(gameEvent);
    setSelectedGameEvent(null);
  };

  return (
    <div className={pageContainer}>
      <div className={listContainer({ hidden: !!selectedGameEvent })}>
        <button onClick={() => setSelectedGameEvent(newGameEventBase)}>
          {locale.gameEvents.createNew}
        </button>

        <ExportEventsButton />
        <ImportEventsButton />
        <MergeGameEventsButton />

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
