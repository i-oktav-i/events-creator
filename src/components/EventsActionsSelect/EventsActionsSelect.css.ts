import { style } from '@vanilla-extract/css';

import { recipe } from '@vanilla-extract/recipes';

import { config, container, inset } from '@shared/theme';

export const eventsActionsSelectModal = style([
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

export const eventsActionsSelectModalContainer = style([
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

export const eventsActionsSelectModalEvents = container({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'x4',
  width: 'full',
});

export const eventsActionsSelectModalEvent = style({
  width: '100%',
  borderBottom: `1px solid ${config.colors.border.primary}`,
});

export const eventsActionsSelectModalActions = container({
  display: 'flex',
  gap: 'x4',
  alignItems: 'center',
});

export const eventsActionsSelectModalAction = recipe({
  base: [
    container({
      display: 'flex',
      gap: 'x4',
      alignItems: 'center',
      padding: 'x2',
    }),
    {
      borderRadius: config.radii.x2,
      border: `1px solid ${config.colors.border.primary}`,
    },
  ],
  variants: {
    selected: {
      true: {
        border: `1px solid ${config.colors.border.active}`,
      },
    },
  },
});

export const eventsActionsSelect = container({
  display: 'flex',
  flexDirection: 'column',
  gap: 'x4',
  width: 'full',
});

export const eventsActionsSelectSelectedContainer = container({
  display: 'flex',
  flexDirection: 'column',
  gap: 'x4',
  width: 'full',
});

export const eventsActionsSelectSelectedItem = style([
  container({
    display: 'flex',
    gap: 'x4',
    flexDirection: 'column',
    padding: 'x2',
    width: 'full',
  }),
  {
    border: `1px solid ${config.colors.border.primary}`,
    borderRadius: config.radii.x2,
  },
]);

export const eventsActionsSelectSelectedItemActions = style([
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
