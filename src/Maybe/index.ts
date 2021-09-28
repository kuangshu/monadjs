import { FilterMethod, MapMethod, Monad, MonadClass } from '@/interface';
import { hasValue } from '@/utils';

class Maybe extends MonadClass {
  static just(a) {
    return new Just(a);
  }
  static nothing() {
    return new Nothing();
  }
  static fromNullAble(a) {
    return hasValue(a) ? this.just(a) : this.nothing();
  }
  static of(a) {
    return this.just(a);
  }
  get isNothing(): boolean {
    return false;
  }
  get isJust(): boolean {
    return false;
  }
}

export class Just extends Maybe implements Monad {
  private __value;
  constructor(value) {
    super();
    this.__value = value;
  }

  get value() {
    return this.__value;
  }

  map(f: MapMethod) {
    return Just.of(f(this.__value));
  }

  getOrElse() {
    return this.value;
  }

  filter(f: FilterMethod) {
    Maybe.fromNullAble(f(this.value) ? this.value : null);
  }

  get isJust() {
    return true;
  }
}
export class Nothing extends Maybe implements Monad {
  map(f: MapMethod) {
    return this;
  }

  get value() {
    throw new TypeError("Can't extract the value of a Nothing");
  }

  getOrElse(other) {
    return other;
  }

  filter() {
    return this.value;
  }
  get isNothing() {
    return true;
  }
}

export default Maybe;
