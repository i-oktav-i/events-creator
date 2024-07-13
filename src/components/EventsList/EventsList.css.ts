import { style } from "@vanilla-extract/css";

import { container } from "@theme";

export const eventsList = style([
  container({
    display: "flex",
    flexDirection: "column",
    gap: "x4",
  }),
  {
    width: "100%",
    height: "100%",
  },
]);
export const eventsListSearch = style({
  width: "100%",
});

export const eventsListScroll = style([
  container({
    display: "flex",
    flexDirection: "column",
    gap: "x4",
  }),
  {
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
]);
