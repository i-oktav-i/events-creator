import mermaid from 'mermaid';
import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { GameEvent, GameEventId, useGameEvents } from '@entities/gameEvent';
import { appThemeService, useAppTheme } from '@shared/AppTheme';
import { GameEventForm, GameEventsGraph } from '@widgets/gameEvent';
import { formContainer, fullSizeContainer, pageContainer } from './Graph.css';

mermaid.initialize({ theme: appThemeService.currentTheme.toLowerCase() });

export const GraphPage: FC = () => {
  const [editingGameEvent, setEditingGameEvent] = useState<GameEvent | null>(null);

  const { gameEvents, updateGameEvent, findGameEvent } = useGameEvents();
  const { theme } = useAppTheme();

  const onFormAbort = () => setEditingGameEvent(null);
  const onFormSubmit = (updatedGameEvent: GameEvent) => {
    updateGameEvent(updatedGameEvent);
    onFormAbort();
  };

  const onEventNodeClick = useCallback((id: GameEventId) => {
    setEditingGameEvent(findGameEvent(id)!);
  }, []);

  useLayoutEffect(() => {
    mermaid.initialize({ theme: theme.toLowerCase() });
  }, [theme]);

  return (
    <div className={pageContainer}>
      <TransformWrapper maxScale={Infinity} centerOnInit smooth={false} centerZoomedOut>
        <TransformComponent wrapperClass={fullSizeContainer} contentClass={fullSizeContainer}>
          <GameEventsGraph gameEvents={gameEvents} onEventNodeClick={onEventNodeClick} />
        </TransformComponent>
      </TransformWrapper>

      {editingGameEvent ? (
        <div className={formContainer}>
          <GameEventForm
            key={editingGameEvent.id}
            defaultValues={editingGameEvent}
            onSubmit={onFormSubmit}
            onAbort={onFormAbort}
          />
        </div>
      ) : null}
    </div>
  );
};
