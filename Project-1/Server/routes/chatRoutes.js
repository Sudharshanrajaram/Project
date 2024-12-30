const express = require("express");
const router = express.Router();
const { getChats, sendMessage, sendMessage2 } = require("../controllers/chatController");

// Route to get all chats
router.get("/", getChats);

// Route to send a new chat message
router.post("/send", sendMessage);
router.post("/send2", sendMessage2);

module.exports = router;
