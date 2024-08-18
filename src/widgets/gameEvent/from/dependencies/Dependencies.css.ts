import { container } from '@shared/theme';
import { style } from '@vanilla-extract/css';

export const stateContainer = container({
  display: 'flex',
  gap: 'x4',
  flexWrap: 'wrap',
});

export const summaryContainer = style({ width: '100%' });
