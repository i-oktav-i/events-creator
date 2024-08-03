import { globalStyle, style } from '@vanilla-extract/css';

import { config, container } from '@shared/theme';

export const rangeFieldset = style([
  container({ display: 'flex', gap: 'x4' }),
  {
    width: 200,
    outlineOffset: config.space.x1,

    ':focus-within': {
      outline: `1px solid ${config.colors.border.active}`,
    },
  },
]);

export const rangeFieldsetItem = style([
  container({ display: 'flex', flexDirection: 'column', gap: 'x4' }),
  { width: '50%' },
]);

globalStyle(`${rangeFieldsetItem} input`, {
  width: '100%',
});

globalStyle(`${rangeFieldsetItem} input[type='checkbox']`, {
  width: 'auto',
});

export const rangeFieldsetItemTitle = container({
  display: 'flex',
  gap: 'x4',
});
