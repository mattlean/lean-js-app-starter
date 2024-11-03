import createApp from "./createApp";
import "./index.scss";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error('HTML element with an ID of "root" was not found.');
}

createApp(rootEl);
