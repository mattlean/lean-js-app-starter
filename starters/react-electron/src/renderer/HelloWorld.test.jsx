import renderer from "react-test-renderer";

import HelloWorld from "./HelloWorld";

test("HelloWorld component matches snapshot", () => {
  const tree = renderer.create(<HelloWorld />).toJSON();
  expect(tree).toMatchSnapshot();
});
