import createFooterText from ".";

test("Footer text element matches snapshot", () => {
  expect(createFooterText()).toMatchSnapshot();
});
