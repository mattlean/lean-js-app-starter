import { createRoot } from "react-dom/client";

import HelloComponent from "./HelloComponent";

const rootEl = document.createElement("div");
document.body.appendChild(rootEl);

const root = createRoot(rootEl);
root.render(<HelloComponent />);
