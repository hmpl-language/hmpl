const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const chokidar = require("chokidar");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

const staticPath = path.join(__dirname, "../build");
const indexPath = path.join(staticPath, "index.html");
const srcFile = path.join(__dirname, "../src/index.html");

const injectLiveReload = (html) => {
  const script = `
    <script>
      const ws = new WebSocket("ws://" + location.host + "/reload");
      ws.onmessage = (event) => {
        if (event.data === "reload") location.reload();
      };
    </script>
  `;
  return html.replace("</body>", `${script}</body>`);
};

app.get("/", (req, res) => {
  fs.readFile(indexPath, "utf-8", (err, html) => {
    if (err) return res.status(500).send("Failed to load page");
    res.send(injectLiveReload(html));
  });
});

app.use(express.static(staticPath));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/reload" });

let sockets = [];
wss.on("connection", (ws) => {
  sockets.push(ws);
  ws.on("close", () => {
    sockets = sockets.filter((s) => s !== ws);
  });
});

chokidar.watch(srcFile).on("change", () => {
  console.log("src/index.html changed. Rebuilding...");

  exec("npm run build", (err, stdout, stderr) => {
    if (err) {
      console.error("Build failed:", stderr);
    } else {
      console.log("Build completed. Reloading browser...");
      sockets.forEach((ws) => ws.send("reload"));
    }
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
