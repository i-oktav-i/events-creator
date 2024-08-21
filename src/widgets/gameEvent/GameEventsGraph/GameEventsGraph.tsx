import cn from 'classnames';
import mermaid from 'mermaid';
import { FC, useEffect, useMemo } from 'react';

import { Dependencies, GameEvent, GameEventAction, IdsDependenciesInfo } from '@entities/gameEvent';
import { useAppTheme } from '@shared/AppTheme';
import { graphContainer } from './GameEventsGraph.css';

export type GameEventsGraphProps = {
  gameEvents: GameEvent[];
};

const getItemNode = (item: GameEvent | GameEventAction) => `
  ${item.id}[<p>${item.title}</p><p>${item.description}</p>]
`;

const getActionsConfections = (gameEvent: GameEvent) => `
  ${gameEvent.id} --> ${gameEvent.actions.map((action) => `${action.id}`).join(' & ')}
`;

const getIdsConnections = (
  targetNode: string | number,
  connectionType: 'o' | 'x',
  prefix: string,
  idsDependencies?: IdsDependenciesInfo<string | number>,
): string => {
  if (!idsDependencies || !idsDependencies.ids.length) return '';

  const unionNodeId = `${targetNode}-${prefix}-${idsDependencies.type}`;
  const connectionArrow = `--${connectionType}`;
  const connections = idsDependencies.ids
    .map((dependency, index) => {
      if (typeof dependency !== 'object') {
        return `${dependency} ${connectionArrow} ${unionNodeId}`;
      }

      return getIdsConnections(unionNodeId, connectionType, `${prefix}-${index}`, dependency);
    })
    .filter(Boolean);

  return [
    `${unionNodeId}(${idsDependencies.type})`,
    `${unionNodeId} ${connectionArrow} ${targetNode}`,
    connections,
  ]
    .flat()
    .join('\n');
};

const getDependenciesGraph = (targetId: string | number, dependencies?: Dependencies) => {
  if (!dependencies) return '';

  return [
    getIdsConnections(targetId, 'o', 'er', dependencies.events?.required),
    getIdsConnections(targetId, 'x', 'eb', dependencies.events?.blocking),
    getIdsConnections(targetId, 'o', 'ar', dependencies.actions?.required),
    getIdsConnections(targetId, 'x', 'ab', dependencies.actions?.blocking),
  ].join('\n');
};

export const GameEventsGraph: FC<GameEventsGraphProps> = ({ gameEvents }) => {
  const { theme } = useAppTheme();

  const text = useMemo(
    () =>
      gameEvents
        .map((gameEvent): string => {
          const { dependencies, id, actions } = gameEvent;

          return [
            `subgraph e${id}`,
            getItemNode(gameEvent),
            actions.map((action) => getItemNode(action)),
            getActionsConfections(gameEvent),
            `end`,
            getDependenciesGraph(id, dependencies),
            actions
              .map((action) => getDependenciesGraph(action.id, action.dependencies))
              .join('\n'),
          ]
            .flat()
            .join('\n');
        })
        .join('\n'),
    [gameEvents],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Need to rerun on every change
  useEffect(() => {
    mermaid.run();
  }, [text, theme]);

  return (
    <div key={theme} className={cn('mermaid', graphContainer)}>
      {`flowchart TD\n${text}`}
    </div>
  );
};
