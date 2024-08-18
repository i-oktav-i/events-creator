import { container } from '@shared/theme';
import { style } from '@vanilla-extract/css';

export const fractionsGroupContainer = container({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'x4',
  width: 'full',
});

export const fractionsGroupContent = container({
  display: 'flex',
  gap: 'x4',
  width: 'full',
});

export const rangeInput = style({ width: 50 });

export const fractionsStateContainer = container({
  display: 'flex',
  gap: 'x4',
  width: 'full',
});
