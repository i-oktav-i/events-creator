import { globalStyle, style } from '@vanilla-extract/css';

import { recipe } from '@vanilla-extract/recipes';

import { config, container } from '@theme';

export const inputField = recipe({
  base: [
    container({ display: 'flex', flexDirection: 'column', gap: 'x4' }),
    {
      outlineOffset: config.space.x4,

      ':focus-within': {
        outline: `1px solid ${config.colors.border.active}`,
      },
    },
  ],
  variants: {
    error: {
      true: {
        outline: `1px solid ${config.colors.status.error}`,
      },
    },
  },
});

globalStyle(`${inputField} input`, {
  width: '100%',
});

globalStyle(`${inputField} textarea`, {
  width: '100%',
  minHeight: 200,
});

export const inputFieldTitle = container({ display: 'flex', gap: 'x4' });

export const inputFieldError = style({
  color: config.colors.status.error,
});

// .InputField {
//   display: flex;
//   flex-direction: column;
//   gap: 16px;

//   &:focus-within {
//     outline: 1px solid #0f7ac2;
//   }
//   outline-offset: 4px;

//   &_error {
//     outline: 1px solid red;
//   }

//   &__Title {
//     display: flex;
//     gap: 16px;
//   }

//   &__Error {
//     color: red;
//   }

//   input {
//     width: 100%;
//   }

//   textarea {
//     width: 100%;
//     min-height: 200px;
//   }
// }
