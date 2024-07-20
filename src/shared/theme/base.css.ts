import { createGlobalTheme, createVar, globalStyle } from '@vanilla-extract/css';
import * as tailwindColors from 'tailwindcss/colors';

// biome-ignore lint/suspicious/noExplicitAny:
type Convert<T extends Record<string, any>> = {
  [Key in keyof T]: T[Key] extends Record<string, string> ? Convert<T[Key]> : string;
};

type TailwindColors = Convert<typeof tailwindColors>;

const baseSize = createVar();

globalStyle(':root', {
  vars: {
    [baseSize]: '4px',
  },
});

export const tokensConfig = createGlobalTheme(':root', {
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontSize: {
      s: '16px',
      m: '18px',
      l: '20px',
    },
    lineHeight: {
      s: '20px',
      m: '20px',
      l: '24px',
    },
    fontWeight: {
      semiBold: '550',
      regular: '400',
    },
  },
  space: {
    x0: `calc(${baseSize} * 0)`,
    x1: `calc(${baseSize} * 1)`,
    x2: `calc(${baseSize} * 2)`,
    x3: `calc(${baseSize} * 3)`,
    x4: `calc(${baseSize} * 4)`,
    x5: `calc(${baseSize} * 5)`,
    x6: `calc(${baseSize} * 6)`,
    x7: `calc(${baseSize} * 7)`,
    x8: `calc(${baseSize} * 8)`,
  },
  radii: {
    infinity: '50%',
    x0: `calc(${baseSize} * 0)`,
    x1: `calc(${baseSize} * 1)`,
    x2: `calc(${baseSize} * 2)`,
    x3: `calc(${baseSize} * 3)`,
    x4: `calc(${baseSize} * 4)`,
  },
  tailwindColors: tailwindColors as TailwindColors,
});
