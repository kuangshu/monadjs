export interface Generator<T = any> {
  (...args: any[]): GeneratorReturnType<T>;
}
export type GeneratorReturnType<T = any> = T | undefined;

export const integer =
  (
    from: number = 0,
    to: number = Number.MAX_SAFE_INTEGER,
    step: number = 1,
  ): Generator<number> =>
  (): GeneratorReturnType<number> => {
    if (from < to) {
      const result = from;
      from += step;
      return result;
    }
  };

export const element = <T = any>(
  array: T[],
  generator: Generator<number> = integer(0, array.length),
): Generator<T> =>
  function elementGenerator(
    ...args: Parameters<typeof generator>
  ): GeneratorReturnType<T> {
    const index = generator(...args);
    if (index !== undefined) {
      return array[index];
    }
  };

export const property = <T extends object>(
  object: T,
  generator: Generator<keyof T> = element(Object.keys(object) as (keyof T)[]),
): Generator<[keyof T, T[keyof T]]> =>
  function propertyGenerator(
    ...args: Parameters<typeof generator>
  ): GeneratorReturnType<[keyof T, T[keyof T]]> {
    const key = generator(...args);
    if (key !== undefined) {
      return [key, object[key]];
    }
  };

export const collect = <T = any>(
  generator: Generator<T>,
  array: T[],
): Generator<T> =>
  function collectGenerator(
    ...args: Parameters<typeof generator>
  ): GeneratorReturnType<T> {
    const result = generator(...args);
    if (result !== undefined) {
      array.push(result);
    }
    return result;
  };

export const repeat = <T = any>(generator: Generator<T>) => {
  if (generator() !== undefined) {
    return repeat(generator);
  }
};

export const harvest = <T = any>(generator: Generator<T>) => {
  const array: T[] = [];
  repeat(collect(generator, array));
  return array;
};

export const limit =
  <T = any>(generator: Generator<T>, count: number = 1): Generator<T> =>
  (...args) => {
    if (count >= 1) {
      count -= 1;
      return generator(...args);
    }
  };

export const filter = <T = any>(
  generator: Generator<T>,
  predicate: (value: T) => boolean,
): Generator<T> => {
  return function filterGenerator(...args) {
    const value = generator(...args);
    if (value !== undefined && !predicate(value)) {
      return filterGenerator(...args);
    }
    return value;
  };
};

export const concat = <T = any>(
  ...generators: Generator<T>[]
): Generator<T> => {
  const next = element(generators);
  let generator = next();
  return function concatGenerator(...args) {
    if (generator !== undefined) {
      const value = generator(...args);
      if (value === undefined) {
        generator = next();
        return concatGenerator(...args);
      }
      return value;
    }
  };
};

export const join = <T = any>(
  func: (...values: GeneratorReturnType<T>[]) => any,
  ...generators: Generator<T>[]
): Generator<ReturnType<typeof func>> => {
  return function joinGenerator() {
    return func(...generators.map((gen) => gen()));
  };
};

export const map = <T = any>(
  array: T[],
  func: (...values: GeneratorReturnType<T>[]) => any,
): ReturnType<typeof func>[] => harvest(join(func, element(array)));

export const objectify =
  (...names: string[]) =>
  (...values: any[]) => {
    const object = Object.create(null);
    names.forEach((name, index) => {
      object[name] = values[index];
    });
    return object;
  };

export const mapTree = <T = any>(
  treeData: T[],
  func: (item: T) => any,
  getChildren: (item: T) => T[],
): ReturnType<typeof func>[] => {
  let next = element(treeData);
  return harvest(() => {
    let item = next();
    if (item !== undefined) {
      const children = getChildren(item);
      if (Array.isArray(children) && children.length) {
        next = concat(element(children), next);
      }
      return func(item);
    }
  });
};
