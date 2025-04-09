const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../build")));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
