import { globalStyle } from '@vanilla-extract/css';

import { config, darkThemeClassName, lightThemeClassName } from '@shared/theme';

globalStyle(`${lightThemeClassName}, ${darkThemeClassName}`, {
  fontFamily: config.typography.fontFamily,
  fontSize: config.typography.fontSize.m,
  fontWeight: config.typography.fontWeight.regular,
  color: config.colors.text.primary,
});

/* box sizing rules */
globalStyle(`*, *::before, *::after`, {
  boxSizing: 'border-box',
});

/* remove default padding */
globalStyle(`ul, ol`, {
  padding: 0,
});

/* remove default margin */
globalStyle(
  `body, h1, h2, h3, h4, h5, h6, p, span, ul, ol, li, figure, figcaption, fieldset, blockquote, dl, dd`,
  {
    margin: 0,
  },
);

/* set core body defaults */
globalStyle('body', {
  minHeight: '100svh',
  display: 'flex',
  flexDirection: 'column',
});

/* remove list styles on ul, ol elements with a class attribute */
globalStyle(`ul, ol`, {
  listStyle: 'none',
});

globalStyle('#root', {
  width: '100vw',
  height: '100dvh',
});
