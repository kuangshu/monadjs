---
order: 4
---

# Monad

```javascript
// 练习 1
// ==========
// 给定一个 user，使用 safeProp 和 map/join 或 chain 安全地获取 street 的 name

var safeProp = _.curry(function (x, o) {
  return Maybe.of(o[x]);
});
var user = {
  id: 2,
  name: 'albert',
  address: {
    street: {
      number: 22,
      name: 'Walnut St',
    },
  },
};

var ex1 = undefined;

const ex1 = compose(
  chain(safeProp('name')),
  chain(safeProp('street')),
  safeProp('address'),
);

// 练习 2
// ==========
// 使用 getFile 获取文件名并删除目录，所以返回值仅仅是文件，然后以纯的方式打印文件

var getFile = function () {
  return new IO(function () {
    return __filename;
  });
};

var pureLog = function (x) {
  return new IO(function () {
    console.log(x);
    return 'logged ' + x;
  });
};

var ex2 = undefined;

const ex2 = compose(chain(compose(pureLog, last, split('/'))), getFile);

// 练习 3
// ==========
// 使用 getPost() 然后以 post 的 id 调用 getComments()
var getPost = function (i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res({ id: i, title: 'Love them tasks' });
    }, 300);
  });
};

var getComments = function (i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res([
        { post_id: i, body: 'This book should be illegal' },
        { post_id: i, body: 'Monads are like smelly shallots' },
      ]);
    }, 300);
  });
};

var ex3 = undefined;

const ex3 = compose(chain(compose(getComments, prop('id'))), getPost);

// 练习 4
// ==========
// 用 validateEmail、addToMailingList 和 emailBlast 实现 ex4 的类型签名

//  addToMailingList :: Email -> IO([Email])
var addToMailingList = (function (list) {
  return function (email) {
    return new IO(function () {
      list.push(email);
      return list;
    });
  };
})([]);

function emailBlast(list) {
  return new IO(function () {
    return 'emailed: ' + list.join(',');
  });
}

var validateEmail = function (x) {
  return x.match(/\S+@\S+\.\S+/) ? new Right(x) : new Left('invalid email');
};

//  ex4 :: Email -> Either String (IO String)
var ex4 = undefined;

const ex4 = compose(
  // map(chain(emailBlast)),
  // map(addToMailingList),
  map(compose(chain(emailBlast), addToMailingList)),
  validateEmail,
);
```
