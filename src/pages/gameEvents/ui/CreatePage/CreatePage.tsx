import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameEvent, useGameEvents } from '@entities/gameEvent';
import { GameEventForm } from '@widgets/gameEvent';

export const CreatePage: FC = () => {
  const navigate = useNavigate();

  const { gameEvents, getNewEventBase, addGameEvent } = useGameEvents();

  // biome-ignore lint/correctness/useExhaustiveDependencies: need to update if events update
  const gameEventBase = useMemo(getNewEventBase, [gameEvents]);

  const goBack = () => navigate('..');

  const onSubmit = (newGameEvent: GameEvent) => {
    addGameEvent(newGameEvent);
    goBack();
  };

  return <GameEventForm defaultValues={gameEventBase} onSubmit={onSubmit} onAbort={goBack} />;
};
