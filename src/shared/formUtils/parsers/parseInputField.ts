export const parseInputField = (value: string) => {
  console.log('value', value);
  if (!value) return 0;
  return value === '-' ? -0 : parseInt(value, 10);
};
