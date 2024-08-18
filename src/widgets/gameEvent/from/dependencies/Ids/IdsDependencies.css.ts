import { container } from '@shared/theme';
import { style, styleVariants } from '@vanilla-extract/css';

export const fieldsContainer = style({
  width: '100%',
  overflowX: 'auto',
});

export const idsContainer = styleVariants({
  all: [container({ display: 'flex', gap: 'x4', width: 'full' })],
  any: [container({ display: 'flex', flexDirection: 'column', gap: 'x4', width: 'full' })],
});
