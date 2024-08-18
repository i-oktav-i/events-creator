import { config, container } from '@shared/theme';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const labelContainer = recipe({
  base: container({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'x4',
  }),
  variants: {
    error: {
      true: {
        outline: `1px solid ${config.colors.status.error}`,
      },
    },
  },
});

export const label = container({
  display: 'flex',
  alignItems: 'center',
  gap: 'x8',
});

export const error = style({
  color: config.colors.status.error,
});
