const Chat = require("../models/chat");

// Get all chat messages
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chats", error: err });
  }
};

// Send a new chat message
const sendMessage = async (req, res) => {
  const { counselor } = req.body;
  try {
    const newChat = new Chat({ counselor });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err });
  }
};

const sendMessage2 = async (req, res) => {
  const { receiver } = req.body;
  try {
    const newChat = new Chat({ receiver });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err });
  }
};
module.exports = { getChats, sendMessage, sendMessage2 };
