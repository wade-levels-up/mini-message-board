// Setup
const express = require("express");
const path = require("node:path");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Import routes
const indexRouter = require("./routes/indexRouter.js");
const newMsgRouter = require("./routes/newMsgRouter.js");

app.use("/", indexRouter);
app.use("/new", newMsgRouter);

app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`));
