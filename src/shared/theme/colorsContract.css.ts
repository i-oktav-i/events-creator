import { createThemeContract } from '@vanilla-extract/css';

export const colorsContract = createThemeContract({
  colors: {
    text: {
      primary: '',
      secondary: '',
    },
    background: {
      primary: '',
      secondary: '',
      backdrop: '',
      active: '',
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
