import { render } from "@testing-library/react";

import FooterText from ".";

test("FooterText component matches snapshot", () => {
  const { asFragment } = render(<FooterText />);
  expect(asFragment()).toMatchSnapshot();
});
