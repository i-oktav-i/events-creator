import { style } from "@vanilla-extract/css";

import { recipe } from "@vanilla-extract/recipes";

import { config, container, indent } from "@theme";

export const fieldWithPagination = style([
  container({
    display: "flex",
    flexDirection: "column",
    gap: "x4",
  }),
  {
    width: "100%",
  },
]);

export const fieldWithPaginationItem = recipe({
  base: {
    display: "none",
  },
  variants: {
    active: {
      true: {
        display: "block",
      },
    },
  },
});

export const fieldWithPaginationItemSelectButton = recipe({
  variants: {
    active: {
      true: {
        border: `2px solid ${config.colors.border.active}`,
      },
    },
  },
});

export const fieldWithPaginationItemAddButton = indent({ marginRight: "x4" });

export const FieldWithPaginationError = style({
  color: config.colors.status.error,
});
