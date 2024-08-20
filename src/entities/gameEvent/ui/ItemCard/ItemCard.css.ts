import { container, typography } from '@shared/theme';
import { recipe } from '@vanilla-extract/recipes';

export const cardContainer = recipe({
  base: [
    container({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'x4',
      border: 'primary',
      paddingX: 'x4',
      paddingY: 'x2',
    }),
  ],
  variants: {
    active: {
      true: [container({ border: 'active' })],
    },
  },
});

export const gameEventTitle = typography({
  variant: 'largeBold',
  color: 'primary',
});

export const gameEventDescription = typography({
  variant: 'mediumTight',
  color: 'secondary',
});
