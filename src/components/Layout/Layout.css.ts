import { style } from '@vanilla-extract/css';

import { config, container, darkThemeClassName, indent } from '@shared/theme';

export const layout = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    gap: 'x4',
    backgroundColor: 'primary',
  }),
  {
    width: '100dvw',
    height: '100dvh',

    selectors: {
      [`${darkThemeClassName}.&`]: {
        colorScheme: 'dark',
      },
    },
  },
]);

export const header = style([
  container({ display: 'flex', justifyContent: 'space-between' }),
  indent({ paddingY: 'x3', paddingX: 'x4' }),
  {
    width: '100%',
    borderBottom: `1px solid ${config.colors.border.active}`,
    borderBottomLeftRadius: config.radii.x4,
    borderBottomRightRadius: config.radii.x4,
  },
]);

export const navigation = container({ display: 'flex', gap: 'x4' });

export const main = style({
  width: '100%',
  height: '100%',
  flex: 'auto',
  overflow: 'hidden',
});
