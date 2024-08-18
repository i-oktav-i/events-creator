import { style, styleVariants } from '@vanilla-extract/css';

const inputBase = style({
  width: '100%',
});

export const input = styleVariants({
  input: [inputBase],
  textarea: [inputBase, { minHeight: 200 }],
});
