import { FC } from 'react';

import { gameEventsClient } from '@entities/gameEvent';
import { locale } from '@shared/locale';

export const ImportEventsButton: FC = () => {
  return <button onClick={gameEventsClient.importEvents}>{locale.gameEvents.import}</button>;
};
