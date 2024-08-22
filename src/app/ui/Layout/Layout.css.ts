import { style } from '@vanilla-extract/css';

import { container, darkThemeClassName } from '@shared/theme';

export const layout = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    gap: 'x4',
    backgroundColor: 'primary',
    size: 'viewport',
    overflowY: 'auto',
    overflowX: 'hidden',
  }),
  {
    selectors: {
      [`${darkThemeClassName}.&`]: {
        colorScheme: 'dark',
      },
    },
  },
]);

export const main = container({
  size: 'full',
  flex: 'auto',
  padding: 'x4',
});
