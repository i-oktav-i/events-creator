export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type LastOf<T> = UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R
  ? R
  : never;

/**
 * __Последовательность элементов в массиве может отличаться от последовательности в перечислении__
 *
 * Принимает на вход перечисление и возвращает тип
 * соответствующий массиву, который содержит все элементы перечисления
 */
export type UnionToTuple<T, L = LastOf<T>> = [L] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, L>>, L];

// export type Prettify<T> = { [K in keyof T]: T[K] } & unknown;
// biome-ignore lint/suspicious/noExplicitAny:
export type Prettify<T> = T extends any
  ? T extends infer U
    ? { [Key in keyof U]: U[Key] }
    : never
  : never;

// biome-ignore lint/suspicious/noExplicitAny:
export type DeepPartial<T extends Record<string, any>> = {
  // biome-ignore lint/suspicious/noExplicitAny:
  [Key in keyof T]?: T[Key] extends Record<string, any> ? DeepPartial<T[Key]> : T[Key];
};

// biome-ignore lint/suspicious/noExplicitAny:
export type AnyObject = Record<string, any>;
export type UnknownObject = Record<string, unknown>;

export type TypedOmit<T extends AnyObject, K extends keyof T> = Omit<T, K>;
