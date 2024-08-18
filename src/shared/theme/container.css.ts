import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { tokensConfig } from './base.css';
import { conditions } from './conditions.css';
import { indentProperties } from './indents.css';
import { colorsConfig } from './light.css';

const commonSizes = {
  third: 'calc(100% / 3)',
  quarter: '25%',
  half: '50%',
  full: '100%',
  auto: 'auto',
} as const;

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
    overflow: ['visible', 'hidden', 'scroll', 'auto'],
    overflowX: ['visible', 'hidden', 'scroll', 'auto'],
    overflowY: ['visible', 'hidden', 'scroll', 'auto'],
    width: { ...commonSizes, viewport: '100dvw' },
    height: { ...commonSizes, viewport: '100dvh' },
    border: {},
  },
  shorthands: {
    placeItems: ['justifyContent', 'alignItems'],
    size: ['width', 'height'],
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
