import { createGlobalThemeContract } from '@vanilla-extract/css';

export const colorsContract = createGlobalThemeContract({
  colors: {
    text: {
      primary: '',
      secondary: '',
    },
    background: {
      primary: '',
      secondary: '',
      backdrop: '',
    },
    border: {
      primary: '',
      active: '',
    },
    status: {
      error: '',
    },
  },
});
