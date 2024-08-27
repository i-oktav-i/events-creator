import mermaid from 'mermaid';
import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { GameEvent, GameEventId, useGameEvents } from '@entities/gameEvent';
import { appThemeService, useAppTheme } from '@shared/AppTheme';
import { ConfirmDeleteGameEvent, GameEventForm, GameEventsGraph } from '@widgets/gameEvent';
import { formContainer, fullSizeContainer, pageContainer } from './Graph.css';

mermaid.initialize({
  theme: appThemeService.currentTheme.toLowerCase(),
  maxTextSize: Infinity,
  maxEdges: Infinity,
});

const wheelConfig = { step: 0.1 };

export const GraphPage: FC = () => {
  const [editingGameEvent, setEditingGameEvent] = useState<GameEvent | null>(null);
  const [deletingEventId, setDeletingEventId] = useState<GameEventId | null>(null);

  const { gameEvents, updateGameEvent, findGameEvent, removeGameEvent } = useGameEvents();
  const { theme } = useAppTheme();

  const onFormAbort = () => setEditingGameEvent(null);
  const onFormSubmit = (updatedGameEvent: GameEvent) => {
    updateGameEvent(updatedGameEvent);
    onFormAbort();
  };

  const onDeleteAbort = () => setDeletingEventId(null);
  const onDeleteSubmit = () => {
    removeGameEvent(deletingEventId!);
    setDeletingEventId(null);
  };

  const onEventNodeClick = useCallback((id: GameEventId) => {
    setEditingGameEvent(findGameEvent(id)!);
  }, []);

  useLayoutEffect(() => {
    mermaid.initialize({ theme: theme.toLowerCase(), maxTextSize: Infinity, maxEdges: Infinity });
  }, [theme]);

  return (
    <div className={pageContainer}>
      <TransformWrapper
        minScale={wheelConfig.step}
        maxScale={Infinity}
        centerOnInit
        smooth={false}
        centerZoomedOut
        wheel={wheelConfig}
      >
        <TransformComponent wrapperClass={fullSizeContainer} contentClass={fullSizeContainer}>
          <GameEventsGraph
            gameEvents={gameEvents}
            onEventNodeClick={onEventNodeClick}
            onEventNodeContextMenu={setDeletingEventId}
          />
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

      <ConfirmDeleteGameEvent
        isOpen={!!deletingEventId}
        onAbort={onDeleteAbort}
        onSubmit={onDeleteSubmit}
      />
    </div>
  );
};
