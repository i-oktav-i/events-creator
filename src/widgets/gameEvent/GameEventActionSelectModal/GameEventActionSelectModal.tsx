import { FC, useCallback, useEffect, useState } from 'react';

import { GameEventAction, GameEventsActionsList, useGameEvents } from '@entities/gameEvent';
import { SearchGameEvents } from '@features/gameEvent';
import { locale as fullLocale } from '@shared/locale';
import { Modal } from '@shared/ui';

const locale = fullLocale.gameEvents.gameEventActionSelect;

export type GameEventActionSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
} & (
  | {
      type: 'single';
      onSelect: (gameEvent: GameEventAction) => void;
      initialSelected?: GameEventAction;
    }
  | {
      type: 'multi';
      onSelect: (gameEvent: GameEventAction[]) => void;
      initialSelected?: GameEventAction[];
    }
);

export const GameEventActionSelectModal: FC<GameEventActionSelectModalProps> = ({
  isOpen,
  onClose,
  type,
  onSelect,
  initialSelected = [],
}) => {
  const [selectedGameEventsActions, setSelectedGameEventsActions] = useState<GameEventAction[]>(
    Array.isArray(initialSelected) ? initialSelected : [initialSelected],
  );

  const { gameEvents } = useGameEvents();

  const onGameEventClick = useCallback(
    (gameEventAction: GameEventAction) => {
      if (type === 'single') return setSelectedGameEventsActions([gameEventAction]);

      setSelectedGameEventsActions((current) => {
        const gameEventIndex = current.findIndex(
          (storedGameEvent) => storedGameEvent.id === gameEventAction.id,
        );

        if (gameEventIndex === -1) return [...current, gameEventAction];

        return current.toSpliced(gameEventIndex, 1);
      });
    },
    [type],
  );

  const handleSelect = () => {
    if (type === 'single') onSelect(selectedGameEventsActions[0]);
    else onSelect(selectedGameEventsActions);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Prevent update due select
  useEffect(() => {
    setSelectedGameEventsActions(
      Array.isArray(initialSelected) ? initialSelected : [initialSelected],
    );
  }, [isOpen]);

  return (
    <Modal title={locale.title[type]} isOpen={isOpen} onClose={onClose}>
      <SearchGameEvents gameEvents={gameEvents} checkActions>
        {(filteredGameEvents) => (
          <GameEventsActionsList
            gameEvents={filteredGameEvents}
            activeGameEventActionsId={selectedGameEventsActions.map((gameEvent) => gameEvent.id)}
            onClick={onGameEventClick}
          />
        )}
      </SearchGameEvents>

      {selectedGameEventsActions.length ? (
        <button type="button" onClick={handleSelect}>
          {locale.confirm}
        </button>
      ) : (
        <span>{locale.empty}</span>
      )}
    </Modal>
  );
};
