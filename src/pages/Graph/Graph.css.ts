import { container } from '@shared/theme';
import { style } from '@vanilla-extract/css';

export const pageContainer = container({ size: 'full', display: 'flex' });

export const fullSizeContainer = style({
  selectors: {
    '&&': {
      width: '100%',
      height: '100%',
    },
  },
});

export const formContainer = container({
  width: 'twoThird',
  flex: 'none',
  border: 'primary',
  padding: 'x1',
  overflowX: 'auto',
});
