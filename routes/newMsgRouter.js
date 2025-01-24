const { Router } = require("express");
const newMsgRouter = Router();

newMsgRouter.get("/", (req, res) => res.render("pages/newMsg"));

module.exports = newMsgRouter;
