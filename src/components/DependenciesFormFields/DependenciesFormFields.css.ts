import { style } from "@vanilla-extract/css";

import { container } from "@theme";

export const dependenciesFormFields = style({
  width: "100%",
});

export const dependenciesFormFieldsSummary = style({
  width: "100%",
});

export const dependenciesFormFieldsDetails = container({
  display: "flex",
  flexWrap: "wrap",
});
