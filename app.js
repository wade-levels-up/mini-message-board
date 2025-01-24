// Setup
const express = require("express");
const path = require("node:path");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true })); // Parses form data provided by req.body

// Import routes
const indexRouter = require("./routes/indexRouter.js");

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).render("pages/error", {
    errorCode: err.status,
    errorMessage: err.message,
  });
});

app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`));
