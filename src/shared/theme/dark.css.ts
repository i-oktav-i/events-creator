import { createTheme } from '@vanilla-extract/css';

import { tokensConfig } from './base.css';
import { colorsConfig } from './light.css';

export const darkThemeClassName = createTheme(colorsConfig, {
  colors: {
    text: {
      primary: tokensConfig.tailwindColors.neutral[50],
      secondary: tokensConfig.tailwindColors.neutral[400],
    },
    background: {
      primary: tokensConfig.tailwindColors.neutral[900],
      secondary: tokensConfig.tailwindColors.gray[600],
      backdrop: tokensConfig.tailwindColors.neutral[200],
      active: tokensConfig.tailwindColors.blue[700],
    },
    border: {
      primary: tokensConfig.tailwindColors.gray[400],
      active: tokensConfig.tailwindColors.blue[500],
    },
    status: {
      error: tokensConfig.tailwindColors.red[500],
    },
  },
});
