import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { tokensConfig } from './base.css';
import { conditions } from './conditions.css';
import { indentProperties } from './indents.css';
import { colorsConfig } from './light.css';

const responsiveProperties = defineProperties({
  ...conditions,
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    flexWrap: ['nowrap', 'wrap'],
    flex: ['auto', 'none'],
    gap: tokensConfig.space,
    rowGap: tokensConfig.space,
    columnGap: tokensConfig.space,
  },
  shorthands: {
    placeItems: ['justifyContent', 'alignItems'],
  },
});

const containerColorProperties = defineProperties({
  properties: {
    backgroundColor: colorsConfig.colors.background,
  },
});

export const container = createSprinkles(
  indentProperties,
  responsiveProperties,
  containerColorProperties,
);

export type ContainerProps = Parameters<typeof container>[0];
