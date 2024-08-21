import { FC, useCallback, useEffect, useState } from 'react';

import { GameEvent, GameEventsList, useGameEvents } from '@entities/gameEvent';
import { SearchGameEvents } from '@features/gameEvent';
import { Modal } from '@shared/ui';

export type GameEventSelectProps = {
  isOpen: boolean;
  onClose: () => void;
} & (
  | {
      type: 'single';
      onSelect: (gameEvent: GameEvent) => void;
      initialSelected?: GameEvent;
    }
  | {
      type: 'multi';
      onSelect: (gameEvent: GameEvent[]) => void;
      initialSelected?: GameEvent[];
    }
);

export const GameEventSelectModal: FC<GameEventSelectProps> = ({
  isOpen,
  onClose,
  type,
  onSelect,
  initialSelected = [],
}) => {
  const [selectedGameEvents, setSelectedGameEvents] = useState<GameEvent[]>(
    Array.isArray(initialSelected) ? initialSelected : [initialSelected],
  );

  const { gameEvents } = useGameEvents();

  const onGameEventClick = useCallback(
    (gameEvent: GameEvent) => {
      if (type === 'single') return setSelectedGameEvents([gameEvent]);

      setSelectedGameEvents((current) => {
        const gameEventIndex = current.findIndex(
          (storedGameEvent) => storedGameEvent.id === gameEvent.id,
        );

        if (gameEventIndex === -1) return [...current, gameEvent];

        return current.toSpliced(gameEventIndex, 1);
      });
    },
    [type],
  );

  const handleSelect = () => {
    console.log('here');
    if (type === 'single') onSelect(selectedGameEvents[0]);
    else onSelect(selectedGameEvents);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Prevent update due select
  useEffect(() => {
    setSelectedGameEvents(Array.isArray(initialSelected) ? initialSelected : [initialSelected]);
  }, [isOpen]);

  return (
    <Modal title="Select events" isOpen={isOpen} onClose={onClose}>
      <SearchGameEvents gameEvents={gameEvents}>
        {(filteredGameEvents) => (
          <GameEventsList
            gameEvents={filteredGameEvents}
            activeGameEventId={selectedGameEvents.map((gameEvent) => gameEvent.id)}
            onClick={onGameEventClick}
          />
        )}
      </SearchGameEvents>

      {selectedGameEvents.length ? (
        <button type="button" onClick={handleSelect}>
          Confirm
        </button>
      ) : (
        <span>Nothing selected</span>
      )}
    </Modal>
  );
};