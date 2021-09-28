import { curry } from 'ramda';

export const add = curry(function (x, y) {
  return x + y;
});

export const match = curry(function (what, x) {
  return x.match(what);
});

export const replace = curry(function (what, replacement, x) {
  return x.replace(what, replacement);
});

export const filter = curry(function (f, xs) {
  return xs.filter(f);
});

export const map = curry(function map(f, xs) {
  return xs.map(f);
});

export const reduce = curry(function (f, a, xs) {
  return xs.reduce(f, a);
});

export const split = curry(function (what, x) {
  return x.split(what);
});

export const join = curry(function (what, x) {
  return x.join(what);
});

export const toUpperCase = function (x) {
  return x.toUpperCase();
};

export const toLowerCase = function (x) {
  return x.toLowerCase();
};
