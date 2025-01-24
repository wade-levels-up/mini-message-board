const { Router } = require("express");
const indexRouter = Router();
const { format } = require("date-fns");

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: format(new Date(), "dd/MM/yy"),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: format(new Date(), "dd/MM/yy"),
  },
];

indexRouter.get("/", (req, res) =>
  res.render("pages/index", { title: "Mini-Msg-Wall", messages: messages })
);
indexRouter.get("/new", (req, res) => res.render("pages/form"));
indexRouter.post("/new", (req, res) => {
  messages.push({
    id: messages.length + 1,
    text: req.body.messageText,
    user: req.body.userName,
    added: format(new Date(), "dd/MM/yy"),
  });
  res.redirect("/");
});
indexRouter.get("/details", (req, res, next) => {
  try {
    const message = req.query.id
      ? messages[req.query.id - 1]
      : messages[messages.length - 1];
    if (!message) {
      throw new Error("Message not found");
    }
    res.render("pages/details", { messages: message });
  } catch (error) {
    error.status = 404; // Set the status code
    next(error); // Pass the error to the error-handling middleware
  }
});

module.exports = indexRouter;
