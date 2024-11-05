import helloWorld from "./helloWorld";

test('helloWorld function outputs "Hello World!"', () => {
  expect(helloWorld()).toBe("Hello World!");
});
