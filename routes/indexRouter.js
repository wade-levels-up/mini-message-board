const { Router } = require("express");
const indexRouter = Router();
const { format } = require("date-fns");

const messages = [
  {
    id: 1,
    text: "Just deployed my first dynamic Express web app! Uhh.. Woo!",
    user: "⚡️ Odinite Wade",
    added: new Date(),
  },
  {
    id: 2,
    text: "@Wade - Cool but... What the hell's that supposed to mean?",
    user: "Scatman_9000",
    added: new Date(),
  },
  {
    id: 3,
    text: "@Scatman_9000, It's a page that changes content based on who is visiting or the data stored on the server at the time the page is displayed. If you submit a message here, it'll change what's stored on the server, which in turn changes what everyone else here sees.",
    user: "✌🏻 Odinite George",
    added: new Date(),
  },
  {
    id: 4,
    text: "@Odinite George - Ohhhhh... Okay! Sure? 😅",
    user: "Scatman_9000",
    added: new Date(),
  },
];

function formatMessagesDate() {
  return messages.map((message) => ({
    ...message,
    added: format(message.added, "h:mm dd/MM/yy"),
  }));
}

indexRouter.get("/", (req, res) => {
  res.render("pages/index", { title: "Mini-Msg-Wall", messages: formatMessagesDate() })
});
indexRouter.get("/new", (req, res) => res.render("pages/form"));

indexRouter.post("/new", (req, res) => {
  messages.push({
    id: messages.length + 1,
    text: req.body.messageText,
    user: req.body.userName,
    added: new Date(),
  });
  res.redirect("/");
});

indexRouter.get("/details", (req, res, next) => {

  try {
    const formatedMessages = formatMessagesDate();
    const message = req.query.id
      ? formatedMessages[req.query.id - 1]
      : formatedMessages[formatedMessages.length - 1];
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
