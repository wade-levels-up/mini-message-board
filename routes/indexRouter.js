const { Router } = require("express");
const indexRouter = Router();
const { format } = require("date-fns");
const db = require('../db/queries');
const asyncHandler = require('express-async-handler')

// const messages = [
//   {
//     id: 1,
//     text: "Just deployed my first dynamic Express web app! Uhh.. Woo!",
//     user: "⚡️ Odinite Wade",
//     added: new Date(),
//   },
//   {
//     id: 2,
//     text: "@Wade - Cool but... What the hell's that supposed to mean?",
//     user: "Scatman_9000",
//     added: new Date(),
//   },
//   {
//     id: 3,
//     text: "@Scatman_9000, It's a page that changes content based on who is visiting or the data stored on the server at the time the page is displayed. If you submit a message here, it'll change what's stored on the server, which in turn changes what everyone else here sees.",
//     user: "✌🏻 Odinite George",
//     added: new Date(),
//   },
//   {
//     id: 4,
//     text: "@Odinite George - Ohhhhh... Okay! Sure? 😅",
//     user: "Scatman_9000",
//     added: new Date(),
//   },
// ];

function formatMessagesDate(msgs) {
  return msgs.map((message) => ({
    ...message,
    added: format(message.added, "h:mm dd/MM/yy"),
  }));
}

indexRouter.get("/", asyncHandler( async(req, res) => {
    res.render("pages/index", { title: "Mini-Msg-Wall", messages: formatMessagesDate(await db.getAllMessages()) })
  }
));

indexRouter.get("/new", (req, res) => res.render("pages/form"));

indexRouter.post("/new", asyncHandler(async (req, res) => {
  await db.insertMessage(req.body.messageText, req.body.userName)
  // messages.push({
  //   id: messages.length + 1,
  //   text: req.body.messageText,
  //   user: req.body.userName,
  //   added: new Date(),
  // });
  res.redirect("/");
}));

indexRouter.get("/details", asyncHandler(async (req, res, next) => {

  try {
    if (!req.query.id) {
      throw new Error('Must provide ID for query')
    }
    const formattedMessage = formatMessagesDate(await db.getMessageById(req.query.id));
    res.render("pages/details", { messages: formattedMessage[0] });
  } catch (error) {
    error.status = 404; // Set the status code
    next(error); // Pass the error to the error-handling middleware
  }
}));

module.exports = indexRouter;
