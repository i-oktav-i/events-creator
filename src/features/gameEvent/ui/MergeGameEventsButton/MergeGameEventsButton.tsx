import { FC } from 'react';

import { gameEventsClient } from '@entities/gameEvent';
import { locale } from '@shared/locale';

export const MergeGameEventsButton: FC = () => {
  return <button onClick={gameEventsClient.mergeGameEvents}>{locale.gameEvents.merge}</button>;
};
