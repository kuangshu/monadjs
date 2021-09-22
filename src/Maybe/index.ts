import { FilterMethod } from '@/interface';
import { hasValue } from '@/utils';

class Maybe {
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

class Just extends Maybe {
  [x: string]: any;
  constructor(value) {
    super();
    this._value = value;
  }

  get value() {
    return this._value;
  }

  map(f: (data: any) => any) {
    return Just.of(f(this._value));
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
class Nothing extends Maybe {
  map(f: (data: any) => any) {
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
