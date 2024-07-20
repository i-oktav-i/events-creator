import { style } from '@vanilla-extract/css';

import { config, container } from '@theme';

export const eventCard = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    gap: 'x4',
    alignItems: 'center',
  }),
  {
    width: '100%',
  },
]);

export const eventCardActions = style([
  container({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'x4',
    padding: 'x8',
  }),
  {
    width: '100%',
  },
]);

export const eventCardAction = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'x2',
  }),
  {
    flexGrow: '1',
    flexBasis: `calc((100% - ${config.space.x4} * 2) / 3)`,
  },
]);
