import mermaid from 'mermaid';
import { FC, useLayoutEffect } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useGameEvents } from '@entities/gameEvent';
import { appThemeService, useAppTheme } from '@shared/AppTheme';
import { GameEventsGraph } from '@widgets/gameEvent';
import { fullSizeContainer } from './Graph.css';

mermaid.initialize({ theme: appThemeService.currentTheme.toLowerCase() });

export const GraphPage: FC = () => {
  const { gameEvents } = useGameEvents();
  const { theme } = useAppTheme();

  useLayoutEffect(() => {
    mermaid.initialize({ theme: theme.toLowerCase() });
  }, [theme]);

  return (
    <TransformWrapper maxScale={Infinity} centerOnInit smooth={false} centerZoomedOut>
      <TransformComponent wrapperClass={fullSizeContainer} contentClass={fullSizeContainer}>
        <GameEventsGraph gameEvents={gameEvents} />
      </TransformComponent>
    </TransformWrapper>
  );
};
