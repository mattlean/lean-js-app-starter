import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import HelloWorld from "./HelloWorld";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error('HTML element with an ID of "root" was not found.');
}

const reactTree = (
  <StrictMode>
    <HelloWorld />
  </StrictMode>
);

if (
  process.env.NODE_ENV === "development" &&
  window.__DEV_SERVER__ &&
  rootEl.childNodes.length === 0
) {
  const root = createRoot(rootEl);
  root.render(reactTree);
} else {
  hydrateRoot(rootEl, reactTree);
}
