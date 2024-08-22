import { ChangeEventHandler, FC, ReactNode, useMemo, useState, useTransition } from 'react';

import { GameEvent, eventsSearch } from '@entities/gameEvent';

import { locale } from '@shared/locale';
import { rootContainer, searchContainer, searchInput } from './SearchGameEvents.css';

export type SearchGameEventsProps = {
  gameEvents: GameEvent[];
  checkActions?: boolean;
  children: (gameEvents: GameEvent[]) => ReactNode;
};

export const SearchGameEvents: FC<SearchGameEventsProps> = ({
  gameEvents,
  checkActions,
  children,
}) => {
  const [_, startTransition] = useTransition();
  const [searchString, setSearchString] = useState('');

  const filteredEvents = useMemo(
    () => eventsSearch(gameEvents, searchString, checkActions),
    [gameEvents, searchString, checkActions],
  );

  const onSearchInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    startTransition(() => {
      setSearchString(event.target.value);
    });
  };

  return (
    <div className={rootContainer}>
      <search className={searchContainer}>
        <input
          type="search"
          onInput={onSearchInput}
          placeholder={locale.gameEvents.search.placeholder}
          className={searchInput}
        />
      </search>

      {filteredEvents.length ? (
        children(filteredEvents)
      ) : (
        <span>{locale.gameEvents.search.empty}</span>
      )}
    </div>
  );
};
