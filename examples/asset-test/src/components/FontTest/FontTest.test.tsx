import renderer from "react-test-renderer";

import FontTest from ".";

test("FontTest component matches snapshot", () => {
  const tree = renderer.create(<FontTest />).toJSON();
  expect(tree).toMatchSnapshot();
});
