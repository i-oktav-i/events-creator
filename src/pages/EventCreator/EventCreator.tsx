import { gameEventsClient } from '@entities/gameEvent';
import { GameEventForm } from '@widgets/gameEvent';

export const EventCreator = () => {
  return <GameEventForm onSubmit={gameEventsClient.addUnknownGameEvent} />;
};
