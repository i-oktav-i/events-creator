import { container } from '@shared/theme';
import { recipe } from '@vanilla-extract/recipes';

export const pageContainer = container({
  padding: 'x4',
  size: 'full',
});

export const listContainer = recipe({
  base: [container({ display: 'flex', flexDirection: 'column', gap: 'x4', size: 'full' })],
  variants: {
    hidden: {
      true: {
        display: 'none',
      },
    },
  },
});
