const method1 =
  ({ defaultShowMessage }) =>
  (name: string, showMessage = defaultShowMessage) => {
    showMessage(name);
  };

const log = method1({ defaultShowMessage: console.log });

log('abc', (name) => console.log('123' + name));
