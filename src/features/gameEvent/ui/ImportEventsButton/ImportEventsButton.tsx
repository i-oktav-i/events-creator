import { FC } from 'react';

import { gameEventsClient } from '@entities/gameEvent';

export const ImportEventsButton: FC = () => {
  return <button onClick={gameEventsClient.importEvents}>Import events</button>;
};
