export abstract class MonadClass {
  static of: (value: any) => Monad;
}

export interface Monad {
  map(fn: MapMethod): Monad;
}

export interface MapMethod {
  (a: any): any;
}

export interface FilterMethod {
  (a: any): boolean;
}
