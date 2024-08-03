import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { tokensConfig } from './base.css';
import { conditions } from './conditions.css';

export const indentProperties = defineProperties({
  ...conditions,
  properties: {
    paddingTop: tokensConfig.space,
    paddingBottom: tokensConfig.space,
    paddingLeft: tokensConfig.space,
    paddingRight: tokensConfig.space,
    marginTop: tokensConfig.space,
    marginBottom: tokensConfig.space,
    marginLeft: tokensConfig.space,
    marginRight: tokensConfig.space,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
});

export const indent = createSprinkles(indentProperties);

export type IndentProps = Parameters<typeof indent>[0];
