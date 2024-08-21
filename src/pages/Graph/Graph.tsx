import mermaid from 'mermaid';
import { FC, useLayoutEffect } from 'react';

import { useGameEvents } from '@entities/gameEvent';
import { appThemeService, useAppTheme } from '@shared/AppTheme';
import { GameEventsGraph } from '@widgets/gameEvent';

mermaid.initialize({
  theme: appThemeService.currentTheme.toLowerCase(),
  flowchart: {
    useMaxWidth: false,
  },
});

export const GraphPage: FC = () => {
  const { gameEvents } = useGameEvents();
  const { theme } = useAppTheme();

  useLayoutEffect(() => {
    mermaid.initialize({
      theme: theme.toLowerCase(),
      flowchart: {
        useMaxWidth: false,
      },
    });
  }, [theme]);

  return <GameEventsGraph gameEvents={gameEvents} />;
};
