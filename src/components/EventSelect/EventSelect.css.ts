import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

import { config, container, inset } from "@theme";

export const eventSelectModal = style([
  container({
    display: "flex",
    flexDirection: "column",
    gap: "x4",
    padding: "x4",
    backgroundColor: "primary",
  }),
  {
    width: "100%",
    height: "100%",
    border: `1px solid ${config.colors.border.active}`,
    borderRadius: config.radii.x4,
  },
]);
export const eventSelectModalContainer = style([
  container({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "x8",
  }),
  inset({ position: "fixed", inset: "x0" }),
  {
    backdropFilter: `blur(${config.space.x1})`,
  },
]);

export const eventSelectModalEvents = style([
  container({
    display: "flex",
    flexWrap: "wrap",
    gap: "x4",
  }),
  {
    width: "100%",
  },
]);

export const eventSelectModalEvent = recipe({
  base: {
    width: "calc(100% / 3)",
    border: `1px solid ${config.colors.border.primary}`,
    borderRadius: config.radii.x1,
  },
  variants: {
    selected: {
      true: {
        border: `1px solid ${config.colors.border.active}`,
      },
    },
  },
});

export const eventSelect = style([
  container({
    display: "flex",
    flexWrap: "wrap",
    gap: "x4",
  }),
  {
    width: "100%",
  },
]);

export const eventSelectSelectedContainer = container({
  display: "flex",
  flexWrap: "wrap",
  gap: "x4",
});

export const eventSelectSelectedItem = style([
  container({
    display: "flex",
    gap: "x4",
    alignItems: "center",
    padding: "x2",
  }),
  {
    border: `1px solid ${config.colors.border.primary}`,
    borderRadius: config.radii.x2,
  },
]);
