import compression from "compression";
import express from "express";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(compression()); // Middleware that compresses most response bodies
}

app.get("/", (req, res) => res.send("Hello World!"));

export default app;
