import { FilterMethod, MapMethod, Monad } from '@/interface';
import { hasValue } from '@/utils';

class Either {
  private __value;
  constructor(value) {
    this.__value = value;
  }

  get value() {
    return this.__value;
  }

  static left(a) {
    return new Left(a);
  }
  static right(a) {
    return new Right(a);
  }

  static fromNullable(val) {
    return hasValue(val) ? this.right(val) : this.left(val);
  }

  static of(a) {
    return this.right(a);
  }
}

export class Left extends Either implements Monad {
  map() {
    return this;
  }

  get value() {
    throw new TypeError("Can't extract the value of a Left(a).");
  }

  getOrElse(other) {
    return other;
  }

  orElse(f: MapMethod) {
    return f(this.value);
  }

  chain(f) {
    return this;
  }
  getOrElseThrow(a: string) {
    throw new Error(a);
  }

  filter(f) {
    return this;
  }
}

export class Right extends Either implements Monad {
  map(f: MapMethod) {
    return Either.of(f(this.value));
  }
  getOrElse(other) {
    return this.value;
  }

  orElse() {
    return this;
  }

  chain(f: MapMethod) {
    return f(this.value);
  }

  getOrElseThrow(message: string) {
    return this.value;
  }

  filter(f: FilterMethod) {
    return Either.fromNullable(f(this.value) ? this.value : null);
  }
}

export default Either;
