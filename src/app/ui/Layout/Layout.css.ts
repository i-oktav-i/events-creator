import { style } from '@vanilla-extract/css';

import { container, darkThemeClassName } from '@shared/theme';

export const layout = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    gap: 'x4',
    backgroundColor: 'primary',
    size: 'viewport',
  }),
  {
    selectors: {
      [`${darkThemeClassName}.&`]: {
        colorScheme: 'dark',
      },
    },
  },
]);

export const main = style({
  width: '100%',
  height: '100%',
  flex: 'auto',
  overflow: 'hidden',
});
