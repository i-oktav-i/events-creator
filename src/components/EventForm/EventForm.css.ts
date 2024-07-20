import { style } from '@vanilla-extract/css';

import { container } from '../../theme';

export const eventForm = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    gap: 'x4',
    padding: 'x4',
  }),
  {
    width: '100%',
    height: '100%',
  },
]);
export const eventFormFields = style([
  container({
    display: 'flex',
    flexDirection: 'column',
    gap: 'x4',
  }),
  {
    overflowY: 'auto',
    height: '100%',
  },
]);

export const eventFormButtons = style([
  container({
    display: 'flex',
    gap: 'x2',
    flex: 'none',
  }),
  {
    width: '100%',
  },
]);
