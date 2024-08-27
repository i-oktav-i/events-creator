import { locale as fullLocale } from '@shared/locale';
import mermaid from 'mermaid';

import { Dependencies, GameEvent, GameEventAction, IdsDependenciesInfo } from '../types';

const locale = fullLocale.gameEvents.graph;

const escapeQuot = (value: string) => value.replace(/"/g, '&quot;');

const getItemNode = (item: GameEvent | GameEventAction, rounded?: boolean) =>
  [
    `${item.id}${rounded ? '(' : '['}"`,
    escapeQuot(`<p>${item.title}</p>`),
    escapeQuot(`<p>${item.description}</p>`),
    ...('triggerProbability' in item
      ? [escapeQuot(`<p>${locale.probability}: ${item.triggerProbability}</p>`)]
      : []),
    `"${rounded ? ')' : ']'}`,
  ].join('');

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

const getGraphText = (gameEvents: GameEvent[]) => {
  const gameEventsGraphText = gameEvents
    .map((gameEvent): string => {
      const { title, dependencies, id, actions } = gameEvent;

      return [
        `subgraph "${locale.event}: ${escapeQuot(title)}"`,
        getItemNode(gameEvent),
        actions.map((action) => getItemNode(action, true)),
        getActionsConfections(gameEvent),
        `end`,
        getDependenciesGraph(id, dependencies),
        actions.map((action) => getDependenciesGraph(action.id, action.dependencies)).join('\n'),
      ]
        .flat()
        .join('\n');
    })
    .join('\n');

  return `flowchart TD\n${gameEventsGraphText}`;
};

export const getGameEventsGraph = async (gameEvents: GameEvent[], graphId: string) => {
  const graphText = getGraphText(gameEvents);

  console.log('graphText', graphText);
  const { svg } = await mermaid.render(graphId, graphText);

  return svg;
};
