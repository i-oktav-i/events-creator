import { config, container, inset } from '@shared/theme';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const modalContainer = recipe({
  base: [
    inset({ position: 'fixed', inset: 'x0' }),
    container({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'x8',
      size: 'full',
      border: 'none',
      backgroundColor: 'transparent',
    }),
    {
      backdropFilter: `blur(${config.radii.x1})`,
      transition: 'opacity 0.2s',
      // @ts-ignore
      '@starting-style': {
        opacity: 0,
      },
    },
  ],
  variants: {
    adaptive: {
      true: {
        width: 'auto',
        height: 'auto',
      },
    },
  },
});

export const modalContent = recipe({
  base: style([
    container({
      display: 'flex',
      flexDirection: 'column',
      size: 'full',
      padding: 'x4',
      gap: 'x4',
      backgroundColor: 'primary',
      border: 'primary',
      borderRadius: 'x4',
    }),
  ]),
  variants: {
    adaptive: {
      true: {
        width: 'auto',
        height: 'auto',
      },
    },
  },
});

export const headerContainer = container({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 'x4',
});

export const contentContainer = container({ overflowY: 'auto', overflowX: 'hidden' });

export const footerContainer = style([
  container({ width: 'full', backgroundColor: 'primary' }),
  inset({ position: 'sticky', bottom: 'x0' }),
]);
