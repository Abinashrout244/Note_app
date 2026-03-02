const express = require("express");
const chatRouter = express.Router();
const { chatWithGrok } = require("../controllers/chatbot.controller");

chatRouter.post("/chat", chatWithGrok);

module.exports = chatRouter;
