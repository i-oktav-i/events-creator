import { config, container, indent, inset } from '@shared/theme';
import { style } from '@vanilla-extract/css';

export const header = style([
  container({
    display: 'flex',
    justifyContent: 'space-between',
    width: 'full',
    backgroundColor: 'primary',
  }),
  inset({ position: 'sticky', top: 'x0' }),
  indent({ paddingY: 'x3', paddingX: 'x4' }),
  {
    borderBottom: `1px solid ${config.colors.border.active}`,
    borderBottomLeftRadius: config.radii.x4,
    borderBottomRightRadius: config.radii.x4,
  },
  {
    zIndex: 1,
  },
]);

export const navigation = container({ display: 'flex', gap: 'x4' });
