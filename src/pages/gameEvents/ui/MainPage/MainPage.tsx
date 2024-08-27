import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameEvent, GameEventId, GameEventsList, useGameEvents } from '@entities/gameEvent';
import {
  ExportEventsButton,
  ImportEventsButton,
  MergeGameEventsButton,
  SearchGameEvents,
} from '@features/gameEvent';
import { locale } from '@shared/locale';

import { Modal } from '@shared/ui';
import { ConfirmDeleteGameEvent } from '@widgets/gameEvent';
import { mainPageContainer } from './MainPage.css';

export const MainPage: FC = () => {
  const navigate = useNavigate();

  const [deletingEventId, setDeletingEventId] = useState<GameEventId | null>(null);

  const { gameEvents, removeGameEvent } = useGameEvents();

  const goToCreate = () => navigate('create/');
  const goToEdit = (gameEvent: GameEvent) => navigate(`edit/${gameEvent.id}`);

  const onDelete = (gameEvent: GameEvent) => setDeletingEventId(gameEvent.id);
  const onDeleteAbort = () => setDeletingEventId(null);
  const onDeleteSubmit = () => {
    removeGameEvent(deletingEventId!);
    setDeletingEventId(null);
  };

  return (
    <>
      <div className={mainPageContainer}>
        <button onClick={goToCreate}>{locale.gameEvents.createNew}</button>

        <ExportEventsButton />
        <ImportEventsButton />
        <MergeGameEventsButton />

        <SearchGameEvents gameEvents={gameEvents}>
          {(filteredGameEvents) => (
            <GameEventsList
              gameEvents={filteredGameEvents}
              onClick={goToEdit}
              onContextMenu={onDelete}
            />
          )}
        </SearchGameEvents>
      </div>

      <ConfirmDeleteGameEvent
        isOpen={!!deletingEventId}
        onAbort={onDeleteAbort}
        onSubmit={onDeleteSubmit}
      />
    </>
  );
};
