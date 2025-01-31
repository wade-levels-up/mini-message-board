const { Router } = require("express");
const indexRouter = Router();
const { format } = require("date-fns");
const db = require('../db/queries');
const asyncHandler = require('express-async-handler')

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
    error.status = 404;
    next(error);
  }
}));

module.exports = indexRouter;
