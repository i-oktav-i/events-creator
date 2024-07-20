import { createTheme } from '@vanilla-extract/css';

import { tokensConfig } from './base.css';

export const [lightThemeClassName, colorsConfig] = createTheme({
  colors: {
    text: {
      primary: tokensConfig.tailwindColors.neutral[950],
      secondary: tokensConfig.tailwindColors.neutral[500],
    },
    background: {
      primary: tokensConfig.tailwindColors.white,
      secondary: tokensConfig.tailwindColors.gray[400],
      backdrop: tokensConfig.tailwindColors.neutral[400],
    },
    border: {
      primary: tokensConfig.tailwindColors.gray[800],
      active: tokensConfig.tailwindColors.blue[700],
    },
    status: {
      error: tokensConfig.tailwindColors.red[700],
    },
  },
});
