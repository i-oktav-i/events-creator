import { useCallback, useEffect, useRef } from 'react';

// biome-ignore lint/suspicious/noExplicitAny:
export const useEventCallback = <T extends (...args: any[]) => any>(callback: T) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: Parameters<T>): ReturnType<T> => callbackRef.current(...args), []);
};
