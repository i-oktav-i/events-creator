import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameEvent, GameEventsList, useGameEvents } from '@entities/gameEvent';
import {
  ExportEventsButton,
  ImportEventsButton,
  MergeGameEventsButton,
  SearchGameEvents,
} from '@features/gameEvent';
import { locale } from '@shared/locale';

import { mainPageContainer } from './MainPage.css';

export const MainPage: FC = () => {
  const navigate = useNavigate();
  const { gameEvents } = useGameEvents();

  const goToCreate = () => navigate('create/');
  const goToEdit = (gameEvent: GameEvent) => navigate(`edit/${gameEvent.id}`);

  return (
    <div className={mainPageContainer}>
      <button onClick={goToCreate}>{locale.gameEvents.createNew}</button>

      <ExportEventsButton />
      <ImportEventsButton />
      <MergeGameEventsButton />

      <SearchGameEvents gameEvents={gameEvents}>
        {(filteredGameEvents) => (
          <GameEventsList gameEvents={filteredGameEvents} onClick={goToEdit} />
        )}
      </SearchGameEvents>
    </div>
  );
};
