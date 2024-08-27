import { config, container, inset } from '@shared/theme';
import { style } from '@vanilla-extract/css';

export const modalContainer = style([
  inset({ position: 'fixed', inset: 'x0' }),
  container({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'x8',
    size: 'auto',
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
]);

export const modalContent = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    maxSize: 'full',
    size: 'auto',
    padding: 'x4',
    gap: 'x4',
    backgroundColor: 'primary',
    border: 'primary',
    borderRadius: 'x4',
  }),
]);

export const header = container({ display: 'flex', justifyContent: 'space-between' });

export const content = container({ overflowY: 'auto', overflowX: 'hidden' });
