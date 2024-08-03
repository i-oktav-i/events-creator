import { MutableRefObject, Ref } from 'react';

export const combineRefs = <T>(...refs: Ref<T>[]): Ref<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref && typeof ref === 'object') {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
};
