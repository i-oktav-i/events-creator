export const safeJsonParse = <T>(value: string, fallback: T) => {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Can`t parse', error);

    return fallback;
  }
};
