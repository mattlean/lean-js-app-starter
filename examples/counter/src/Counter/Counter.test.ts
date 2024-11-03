import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import Counter from ".";
import { clearRootEl, setupRootEl } from "../jestUtil";

describe("Counter element", () => {
  beforeAll(() => setupRootEl());

  afterEach(() => clearRootEl());

  /**
   * Create the counter element and mount it to the root element.
   * @returns
   */
  function setupTest() {
    const rootEl = document.getElementById("root");

    if (!rootEl) {
      throw new Error('HTML element with an ID of "root" was not found.');
    }

    const c = new Counter();
    const counterElement = c.createElement();
    rootEl.appendChild(counterElement);

    return counterElement;
  }

  it("matches snapshot", () => {
    expect(setupTest()).toMatchSnapshot();
  });

  it("increments count when + button is clicked", async () => {
    expect.assertions(4);

    const user = userEvent.setup();

    setupTest();

    // Expect counter to start at 0
    expect(screen.queryByText(0)).toBeInTheDocument();
    expect(screen.queryByText(1)).not.toBeInTheDocument();

    // Click the + button once
    await user.click(screen.getByRole("button", { name: /increment count/i }));

    // Expect counter to have been incremented to 1
    expect(screen.queryByText(1)).toBeInTheDocument();
    expect(screen.queryByText(0)).not.toBeInTheDocument();
  });

  it("decrements count when - button is clicked", async () => {
    expect.assertions(4);

    const user = userEvent.setup();

    setupTest();

    // Expect counter to start at 0
    expect(screen.queryByText(0)).toBeInTheDocument();
    expect(screen.queryByText(-1)).not.toBeInTheDocument();

    // Click the - button once
    await user.click(screen.getByRole("button", { name: /decrement count/i }));

    // Expect counter to have been decremented to -1
    expect(screen.queryByText(-1)).toBeInTheDocument();
    expect(screen.queryByText(0)).not.toBeInTheDocument();
  });

  it("changes count to force count value when force button is clicked", async () => {
    expect.assertions(4);

    const user = userEvent.setup();

    setupTest();

    // Expect counter to start at 0
    expect(screen.queryByText(0)).toBeInTheDocument();
    expect(screen.queryByText(5)).not.toBeInTheDocument();

    await user.type(screen.getByRole("spinbutton"), "5");
    await user.click(screen.getByRole("button", { name: /force!/i }));

    // Expect counter to have been forced to 5
    expect(screen.queryByText(5)).toBeInTheDocument();
    expect(screen.queryByText(0)).not.toBeInTheDocument();
  });

  it("disables force button when force count input is empty", async () => {
    expect.assertions(4);

    const user = userEvent.setup();

    setupTest();

    // Expect force input to start empty
    const inputForceCount = screen.getByRole("spinbutton");
    expect(inputForceCount).toHaveValue(null);

    // Expect force button to start disabled
    const btnForceCount = screen.getByRole("button", { name: /force!/i });
    expect(btnForceCount).toBeDisabled();

    await user.type(inputForceCount, "5");

    // Expect force button to become enabled
    expect(btnForceCount).toBeEnabled();

    await user.clear(inputForceCount);

    // Expect force button to become disabled again
    expect(btnForceCount).toBeDisabled();
  });

  it("resets count when reset button is clicked", async () => {
    expect.assertions(6);

    const user = userEvent.setup();

    setupTest();

    // Expect counter to start at 0
    expect(screen.queryByText(0)).toBeInTheDocument();
    expect(screen.queryByText(3)).not.toBeInTheDocument();

    // Click the + button 3x
    await user.tripleClick(
      screen.getByRole("button", { name: /increment count/i }),
    );

    // Expect counter to have been incremented to 3
    expect(screen.queryByText(3)).toBeInTheDocument();
    expect(screen.queryByText(0)).not.toBeInTheDocument();

    // Click the reset button
    await user.click(screen.getByRole("button", { name: /reset/i }));

    // Expect counter to return to 0
    expect(screen.queryByText(0)).toBeInTheDocument();
    expect(screen.queryByText(3)).not.toBeInTheDocument();
  });
});

describe("Counter class", () => {
  it("defaults counter to 0", () => {
    const c = new Counter();
    expect(c.getCount()).toBe(0);
  });

  it("defaults counter to 2 when 2 is passed into the constructor", () => {
    const c = new Counter(2);
    expect(c.getCount()).toBe(2);
  });

  it("sets the count to 1 when setCount(1) is called", () => {
    const c = new Counter();
    c.setCount(1);
    expect(c.getCount()).toBe(1);
  });
});
