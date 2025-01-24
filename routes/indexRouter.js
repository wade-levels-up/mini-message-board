const { Router } = require("express");
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) =>
  res.render("pages/index", { title: "Mini Messageboard", messages: messages })
);
indexRouter.get("/new", (req, res) => res.render("pages/form"));
indexRouter.post("/new", (req, res) => {
  messages.push({
    text: req.body.messageText,
    user: req.body.userName,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = indexRouter;
