import Counter from "../Counter";
import createFooterText from "../createFooterText";

/**
 * Create the app element and render it within another element.
 * @param element Element to render the app element in
 * @returns The app element containing the counter and footer text elements
 */
const createApp = (element: HTMLElement) => {
  const app = document.createElement("div");
  app.setAttribute("class", "align-items-center d-flex flex-column h-100");

  const c = new Counter();
  app.appendChild(c.createElement());
  app.appendChild(createFooterText());

  element.replaceChildren(app);
  return app;
};

export default createApp;
