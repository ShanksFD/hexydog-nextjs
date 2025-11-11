/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("Internal server error");
      }
    })
      .listen(port, hostname, (err) => {
        if (err) throw err;
        console.log(`> Server started successfully`);
        console.log(`> Environment: ${dev ? "development" : "production"}`);
        console.log(`> Listening on http://${hostname}:${port}`);
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(`> Port ${port} is already in use`);
        } else {
          console.error("> Server error:", err);
        }
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error("> Error starting server:", err);
    process.exit(1);
  });
