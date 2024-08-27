import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import { GameEvent, GameEventId, getGameEventsGraph } from '@entities/gameEvent';
import { useAppTheme } from '@shared/AppTheme';

import { graphContainer } from './GameEventsGraph.css';

export type GameEventsGraphProps = {
  gameEvents: GameEvent[];
  onEventNodeClick?: (id: GameEventId) => void;
  onEventNodeContextMenu?: (id: GameEventId) => void;
};

export const GameEventsGraph: FC<GameEventsGraphProps> = ({
  gameEvents,
  onEventNodeClick,
  onEventNodeContextMenu,
}) => {
  const [svgAsText, setSvgAsText] = useState('');
  const graphContainerRef = useRef<HTMLDivElement>(null);

  const { theme } = useAppTheme();

  useEffect(() => {
    const render = async () => {
      const svg = await getGameEventsGraph(gameEvents, 'graph');

      setSvgAsText(svg);
    };

    render();
  }, [gameEvents, theme]);

  useEffect(() => {
    if (!onEventNodeClick) return;

    const nodes = graphContainerRef.current?.querySelectorAll<HTMLElement>(
      '[data-id]:not([data-id*="-"])',
    );

    const handleClick = (event: MouseEvent) => {
      const dataId = (event.currentTarget as HTMLElement).dataset.id;

      if (!dataId) return;

      onEventNodeClick(+dataId as GameEventId);
    };

    nodes?.forEach((node) => node.addEventListener('click', handleClick));

    return () => nodes?.forEach((node) => node.removeEventListener('click', handleClick));
  }, [svgAsText, onEventNodeClick]);

  useEffect(() => {
    if (!onEventNodeContextMenu) return;

    const nodes = graphContainerRef.current?.querySelectorAll<HTMLElement>(
      '[data-id]:not([data-id*="-"])',
    );

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      const dataId = (event.currentTarget as HTMLElement).dataset.id;

      if (!dataId) return;

      onEventNodeContextMenu(+dataId as GameEventId);
    };

    nodes?.forEach((node) => node.addEventListener('contextmenu', handleContextMenu));

    return () => nodes?.forEach((node) => node.removeEventListener('click', handleContextMenu));
  }, [svgAsText, onEventNodeClick]);

  return (
    <div
      key={theme}
      className={cn('mermaid', graphContainer)}
      ref={graphContainerRef}
      dangerouslySetInnerHTML={{ __html: svgAsText }}
    />
  );
};
