export const required = (value: string) => (value ? undefined : 'Required');
export const atLeastOne = (value: unknown) =>
  Array.isArray(value) && value.length > 0 ? undefined : 'At least one';

export const parseInputField = (value: string) => {
  console.log('value', value);
  if (!value) return 0;
  return value === '-' ? -0 : parseInt(value, 10);
};
