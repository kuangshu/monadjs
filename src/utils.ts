import { curry } from 'ramda';
import { Left, Right } from './Either';

export const hasValue = <T = any>(a: T): boolean =>
  a !== null && a !== undefined;

export const compose =
  <P extends (data: any) => any>(...funcs: P[]) =>
  (a: any) => {
    if (funcs.length === 1) {
      return funcs[0](a);
    }
    const fn = funcs.pop() as P;
    return compose(...funcs)(fn(a));
  };

export const either = curry(function (f, g, e) {
  switch (e.constructor) {
    case Left:
      return f(e.__value);
    case Right:
      return g(e.__value);
  }
});

// overwriting join from pt 1
export const join = function (m) {
  return m.join();
};

export const chain = curry(function (f, m) {
  return m.map(f).join(); // or compose(join, map(f))(m)
});

export const liftA2 = curry(function (f, a1, a2) {
  return a1.map(f).ap(a2);
});

export const liftA3 = curry(function (f, a1, a2, a3) {
  return a1.map(f).ap(a2).ap(a3);
});
