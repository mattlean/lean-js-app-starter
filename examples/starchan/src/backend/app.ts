import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import {
  PATH_BACKEND_SRC,
  PATH_BUILD_DEV,
  PATH_FRONTEND_BUILD_DEV,
} from "../../PATHS";
import {
  createNotFoundErrorHandler,
  globalErrorHandler,
  ssrErrorHandler,
} from "./common/error";
import { apiHandler } from "./routes/api";
import { frontendHandler } from "./routes/frontend";

const BUNDLED_BACK_BUILD_PATH = path.resolve(__dirname);
const BUNDLED_FRONT_BUILD_PATH = path.resolve(__dirname, "../frontend");
const BUNDLED_GENERATED_VIEWS_BUILD_PATH = path.resolve(
  __dirname,
  "../generated-views",
);

const app = express();

// Setup EJS templates
app.set("view engine", "ejs");

// Use the generated views from the frontend build
const viewDirs = [];
if (process.env.NODE_ENV === "test") {
  viewDirs.push(
    `${PATH_BUILD_DEV}/generated-views`,
    `${PATH_BACKEND_SRC}/views`,
  );
} else {
  viewDirs.push(
    BUNDLED_GENERATED_VIEWS_BUILD_PATH,
    `${BUNDLED_BACK_BUILD_PATH}/views`,
  );
}
app.set("views", viewDirs);

app.use(cors()); // Middleware that enables CORS
app.use(express.json()); // Middleware that parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // Middleware that parses incoming requests with urlencoded payloads

const helmetOptions: {
  contentSecurityPolicy: {
    directives: { [key: string]: Array<string> };
  };
} = {
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", "'unsafe-inline'"],
    },
  },
};

if (process.env.E2E) {
  helmetOptions.contentSecurityPolicy.directives["connect-src"] = [
    `http://localhost:${process.env.PORT_EXPRESS_E2E}`,
    `ws://localhost:${process.env.PORT_WEBPACK_DEV_SERVER_E2E}`,
  ];
} else if (process.env.NODE_ENV === "development") {
  helmetOptions.contentSecurityPolicy.directives["connect-src"] = [
    `http://localhost:${process.env.PORT_EXPRESS}`,
    `ws://localhost:${process.env.PORT_WEBPACK_DEV_SERVER}`,
  ];
}
app.use(helmet(helmetOptions)); // Middleware that enhances security by setting HTTP response headers

if (process.env.NODE_ENV === "production") {
  app.use(compression()); // Middleware that compresses most response bodies
}

// Enable HTTP request logger middleware when running in certain environments
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("common"));
}

// Mount router on / paths with handlers that respond with template renderings
app.use("/", frontendHandler);

// Serve the frontend build directory and the backend public directory as static files
let frontBuildPath;
if (process.env.NODE_ENV === "test") {
  frontBuildPath = PATH_FRONTEND_BUILD_DEV;
} else {
  frontBuildPath = BUNDLED_FRONT_BUILD_PATH;
}
app.use("/", express.static(frontBuildPath));

let backPublicPath;
if (process.env.NODE_ENV === "test") {
  backPublicPath = `${PATH_BACKEND_SRC}/public`;
} else {
  backPublicPath = `${BUNDLED_BACK_BUILD_PATH}/public`;
}
app.use("/static", express.static(backPublicPath));

// Mount router on /api paths with handlers that respond with JSON
app.use("/api", apiHandler);

// Handle unknown paths with a not found error handler
app.all("*", createNotFoundErrorHandler());

// Catch all uncaught errors with the SSR error handler
app.use(ssrErrorHandler);

// A catastrophic error happened, so handle it with the global error handler
app.use(globalErrorHandler);

export default app;
