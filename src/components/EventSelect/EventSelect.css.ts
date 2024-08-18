import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { config, container, inset } from '@shared/theme';

export const eventSelectModal = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    gap: 'x4',
    padding: 'x4',
    backgroundColor: 'primary',
    size: 'full',
  }),
  {
    border: `1px solid ${config.colors.border.active}`,
    borderRadius: config.radii.x4,
  },
]);
export const eventSelectModalContainer = style([
  container({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'x8',
  }),
  inset({ position: 'fixed', inset: 'x0' }),
  {
    backdropFilter: `blur(${config.space.x1})`,
  },
]);

export const eventSelectModalEvents = container({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'x4',
  width: 'full',
});

export const eventSelectModalEvent = recipe({
  base: {
    width: 'calc(100% / 3)',
    border: `1px solid ${config.colors.border.primary}`,
    borderRadius: config.radii.x1,
  },
  variants: {
    selected: {
      true: {
        border: `1px solid ${config.colors.border.active}`,
      },
    },
  },
});

export const eventSelect = container({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'x4',
  width: 'full',
});

export const eventSelectSelectedContainer = container({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'x4',
});

export const eventSelectSelectedItem = style([
  container({
    display: 'flex',
    gap: 'x4',
    alignItems: 'center',
    padding: 'x2',
  }),
  {
    border: `1px solid ${config.colors.border.primary}`,
    borderRadius: config.radii.x2,
  },
]);
