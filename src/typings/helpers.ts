export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type LastOf<T> = UnionToIntersection<
  T extends unknown ? () => T : never
> extends () => infer R
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
