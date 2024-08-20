import { recipe } from '@vanilla-extract/recipes';

import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { tokensConfig } from './base.css';
import { colorsContract } from './colorsContract.css';

const typographySizesProperties = defineProperties({
  properties: {
    fontSize: tokensConfig.typography.fontSize,
    lineHeight: tokensConfig.typography.lineHeight,
    fontWeight: tokensConfig.typography.fontWeight,
    color: colorsContract.colors.text,
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
        color: colorsContract.colors.text.primary,
      },
      secondary: {
        color: colorsContract.colors.text.secondary,
      },
    },
  },
  defaultVariants: { variant: 'mediumTight', color: 'primary' },
});
