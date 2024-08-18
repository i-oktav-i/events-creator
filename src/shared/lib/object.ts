import { AnyObject } from '@shared/typings';

export const objectKeys = Object.keys as <T>(o: T) => Array<keyof T>;

export const objectValues = Object.values as <T>(o: T) => Array<T[keyof T]>;

export const objectEntries = Object.entries as <T extends AnyObject>(
  o: T,
) => (keyof T extends infer Keys ? (Keys extends string ? [Keys, T[Keys]] : never) : never)[];

export const objectFromEntries = Object.fromEntries as <Key extends string | number, Value>(
  entries: [Key, Value][],
) => Record<Key, Value>;
