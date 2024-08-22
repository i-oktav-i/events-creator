import { FC } from 'react';

import { gameEventsClient } from '@entities/gameEvent';
import { locale } from '@shared/locale';

export const ExportEventsButton: FC = () => {
  return <button onClick={gameEventsClient.exportEvents}>{locale.gameEvents.export}</button>;
};
