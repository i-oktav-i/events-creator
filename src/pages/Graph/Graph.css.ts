import { container } from '@shared/theme';

export const pageContainer = container({ size: 'full', display: 'flex' });

export const fullSizeContainer = container({ size: 'full' });

export const formContainer = container({
  width: 'twoThird',
  flex: 'none',
  border: 'primary',
  padding: 'x1',
  overflowX: 'auto',
});
