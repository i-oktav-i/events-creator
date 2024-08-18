import { recipe } from '@vanilla-extract/recipes';

import { config, container, indent } from '@shared/theme';
import { styleVariants } from '@vanilla-extract/css';

export const actionContainer = styleVariants({
  hidden: [container({ display: 'none' })],
  visible: [],
});

export const gameStateChangesContainer = container({ display: 'flex', flexWrap: 'wrap' });
export const fractionsStateChangesGroupContainer = container({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'x4',
});
export const fractionsStateChangesContainer = container({
  display: 'flex',
  justifyContent: 'center',
  gap: 'x4',
});

export const actionsContainer = container({ display: 'flex', flexDirection: 'column', gap: 'x3' });

export const paginationContainer = container({ display: 'flex', gap: 'x3' });

export const paginationButton = recipe({
  base: [
    indent({ paddingY: 'x2', paddingX: 'x4' }),
    { background: config.colors.background.primary },
  ],
  variants: {
    error: {
      true: {
        background: config.colors.status.error,
      },
    },
    active: {
      true: {
        background: config.colors.background.active,
      },
    },
  },
});
