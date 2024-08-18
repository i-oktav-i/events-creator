import { FC } from 'react';

import { gameEventsClient } from '@entities/gameEvent';

export const ExportEventsButton: FC = () => {
  return <button onClick={gameEventsClient.exportEvents}>Export events</button>;
};
