import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { conditions } from "./conditions.css";
import { tokensConfig } from "./base.css";

const insetProperties = defineProperties({
  ...conditions,
  properties: {
    position: ["relative", "absolute", "fixed"],
    top: tokensConfig.space,
    bottom: tokensConfig.space,
    left: tokensConfig.space,
    right: tokensConfig.space,
  },
  shorthands: {
    inset: ["top", "bottom", "left", "right"],
    insetX: ["left", "right"],
    insetY: ["top", "bottom"],
  },
});

export const inset = createSprinkles(insetProperties);

export type InsetProps = Parameters<typeof inset>[0];
