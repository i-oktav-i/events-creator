import { container } from '@shared/theme';

export const eventsList = container({
  display: 'flex',
  flexDirection: 'column',
  gap: 'x4',
  size: 'full',
});

export const eventsListSearch = container({ width: 'full' });

export const eventsListScroll = container({
  display: 'flex',
  flexDirection: 'column',
  gap: 'x4',
  size: 'full',
  overflow: 'auto',
});
