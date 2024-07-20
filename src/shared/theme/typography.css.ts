import { recipe } from '@vanilla-extract/recipes';

import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { tokensConfig } from './base.css';
import { colorsConfig } from './light.css';

const typographySizesProperties = defineProperties({
  properties: {
    fontSize: tokensConfig.typography.fontSize,
    lineHeight: tokensConfig.typography.lineHeight,
    fontWeight: tokensConfig.typography.fontWeight,
    color: colorsConfig.colors.text,
  },
  shorthands: {
    variant: ['fontSize', 'lineHeight'],
  },
});

const typographySizes = createSprinkles(typographySizesProperties);

export const typography = recipe({
  base: {
    fontFamily: tokensConfig.typography.fontFamily,
  },
  variants: {
    variant: {
      smallTight: [typographySizes({ variant: 's', fontWeight: 'regular' })],
      mediumTight: [typographySizes({ variant: 'm', fontWeight: 'regular' })],
      largeTight: [typographySizes({ variant: 'l', fontWeight: 'regular' })],
      smallBold: [typographySizes({ variant: 's', fontWeight: 'semiBold' })],
      mediumBold: [typographySizes({ variant: 'm', fontWeight: 'semiBold' })],
      largeBold: [typographySizes({ variant: 'l', fontWeight: 'semiBold' })],
    },
    color: {
      primary: {
        color: colorsConfig.colors.text.primary,
      },
      secondary: {
        color: colorsConfig.colors.text.secondary,
      },
    },
  },
  defaultVariants: { variant: 'mediumTight', color: 'primary' },
});
