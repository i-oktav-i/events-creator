export const required = (value: string) => (value ? undefined : "Required");
export const atLeastOne = (value: unknown) =>
  Array.isArray(value) && value.length > 0 ? undefined : "At least one";
