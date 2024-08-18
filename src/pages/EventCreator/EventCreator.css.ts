import { config, container, indent } from '@shared/theme';
import { style } from '@vanilla-extract/css';

export const root = container({
  display: 'flex',
  gap: 'x4',
  padding: 'x4',
  size: 'full',
});

export const search = style({
  width: '30%',
  height: '100%',
  border: `1px solid ${config.colors.border.primary}`,
});

export const event = style([
  indent({
    padding: 'x4',
    margin: 'x0',
  }),
  {
    width: '100%',
    border: `1px solid ${config.colors.border.primary}`,
  },
]);

export const actionsContainer = container({
  display: 'flex',
  flexDirection: 'column',
  gap: 'x4',
  width: 'full',
});

export const actionButton = style([
  indent({ padding: 'x2' }),
  {
    width: '100%',
    border: `1px solid ${config.colors.border.primary}`,
    borderRadius: config.radii.x2,
    alignSelf: 'center',
  },
]);

export const popover = style([
  container({ display: 'flex', padding: 'x4', gap: 'x4', width: 'full' }),
  {
    border: `1px solid ${config.colors.border.primary}`,
    borderRadius: config.radii.x2,
    alignSelf: 'center',

    '::backdrop': {
      backdropFilter: 'blur(4px)',
    },
  },
]);
