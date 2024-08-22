import { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GameEvent, GameEventId, useGameEvents } from '@entities/gameEvent';
import { GameEventForm } from '@widgets/gameEvent';

export const EditPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: `${GameEventId}` }>();

  const { findGameEvent, updateGameEvent } = useGameEvents();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const gameEvent = useMemo(() => id && findGameEvent(+id as GameEventId), [id]);

  const goBack = () => navigate('..');

  const onSubmit = (updatedGameEvent: GameEvent) => {
    updateGameEvent(updatedGameEvent);
    goBack();
  };

  if (!gameEvent) {
    goBack();

    return null;
  }

  return (
    <GameEventForm
      key={gameEvent.id}
      defaultValues={gameEvent}
      onSubmit={onSubmit}
      onAbort={goBack}
    />
  );
};
