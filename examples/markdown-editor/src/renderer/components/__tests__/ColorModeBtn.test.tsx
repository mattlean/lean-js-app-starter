import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { colorModes } from "../../../common/types";
import ColorModeBtn from "../ColorModeBtn";

beforeEach(() => {
  // Mock the API
  window.api = {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    onColorModeMenu: jest.fn(() => () => {}), // eslint-disable-line @typescript-eslint/no-empty-function
    syncColorModeMenu: jest.fn(),
  };

  // Mock matchMedia since jsdom does not implement it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.matchMedia = jest.fn(() => ({ matches: false }));
});

afterEach(() => localStorage.clear());

/**
 * Setup user-event, render the component, and set initial color mode if necessary.
 * @param colorMode Color mode type that determines which color mode to use
 */
const setupTest = (colorMode?: colorModes) => {
  if (colorMode === "light") {
    localStorage.theme = "light";
  } else if (colorMode === "dark") {
    localStorage.theme = "dark";
  }

  const user = userEvent.setup();
  const { asFragment } = render(<ColorModeBtn />);

  return { asFragment, user };
};

test("ColorModeBtn component matches snapshot", () => {
  const { asFragment } = setupTest();
  expect(asFragment()).toMatchSnapshot();
});

test("ColorModeBtn component starts with system preference mode by default", () => {
  setupTest();

  // Expect button to start with system preference mode
  expect(screen.getByRole("button")).toHaveTextContent(/sys. pref. mode/i);
  expect(localStorage.theme).toBeUndefined();
});

test("ColorModeBtn component starts with light mode when the user has set it from a previous session", () => {
  setupTest("light");

  // Expect button to start with light mode
  expect(screen.getByRole("button")).toHaveTextContent(/light mode/i);
});

test("ColorModeBtn component starts with dark mode when the user has set it from a previous session", () => {
  setupTest("dark");

  // Expect button to start with dark mode
  expect(screen.getByRole("button")).toHaveTextContent(/dark mode/i);
});

test("ColorModeBtn component changes to light mode when clicked the first time", async () => {
  expect.assertions(2);

  const { user } = setupTest();
  const btn = screen.getByRole("button");

  // Expect button to start with system preference mode
  expect(btn).toHaveTextContent(/sys. pref. mode/i);

  await user.click(btn);

  // Expect button to switch to light mode
  expect(btn).toHaveTextContent(/light mode/i);
});

test("ColorModeBtn component changes to dark mode when clicked the first 2 times", async () => {
  expect.assertions(2);

  const { user } = setupTest();
  const btn = screen.getByRole("button");

  // Expect button to start with system preference mode
  expect(btn).toHaveTextContent(/sys. pref. mode/i);

  await user.dblClick(btn);

  // Expect button to switch to dark mode
  expect(btn).toHaveTextContent(/dark mode/i);
});

test("ColorModeBtn component changes back to system preference mode when clicked the first 3 times", async () => {
  expect.assertions(3);

  const { user } = setupTest();
  const btn = screen.getByRole("button");

  // Expect button to start with system preference mode
  expect(btn).toHaveTextContent(/sys. pref. mode/i);

  await user.dblClick(btn);

  // Expect button to switch to dark mode
  expect(btn).toHaveTextContent(/dark mode/i);

  await user.click(btn);

  // Expect button to return to system preference mode
  expect(btn).toHaveTextContent(/sys. pref. mode/i);
});
