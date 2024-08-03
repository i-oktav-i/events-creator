import { config, container, indent } from '@shared/theme';
import { style } from '@vanilla-extract/css';

export const header = style([
  container({ display: 'flex', justifyContent: 'space-between' }),
  indent({ paddingY: 'x3', paddingX: 'x4' }),
  {
    width: '100%',
    borderBottom: `1px solid ${config.colors.border.active}`,
    borderBottomLeftRadius: config.radii.x4,
    borderBottomRightRadius: config.radii.x4,
  },
]);

export const navigation = container({ display: 'flex', gap: 'x4' });
