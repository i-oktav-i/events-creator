import { container, inset } from '@shared/theme';
import { style } from '@vanilla-extract/css';

export const rootContainer = container({
  display: 'flex',
  flexDirection: 'column',
  gap: 'x4',
  size: 'full',
  overflow: 'auto',
});

export const searchContainer = style([
  container({ width: 'full' }),
  inset({ position: 'sticky', top: 'x0' }),
]);
export const searchInput = container({ size: 'full' });
