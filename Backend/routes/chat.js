const express = require('express');
const { geminiAPI } = require('../config/gemini');
const Chat = require('../models/Chat');
const router = express.Router();

router.post('/', async (req, res) => {
  const { message, isLegalQuery } = req.body;
  try {
    const response = await geminiAPI(message);
    res.json({ response });
  } catch (error) {
    res.status(500).send('Error processing request');
  }
});

router.post('/save', async (req, res) => {
  const { uid, message } = req.body;
  try {
    let chat = await Chat.findOne({ uid, createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } });
    if (!chat) {
      chat = new Chat({ uid, messages: [] });
    }
    chat.messages.push(message);
    await chat.save();
    res.json({ status: 'saved' });
  } catch (error) {
    res.status(500).send('Error saving chat');
  }
});

router.get('/:uid', async (req, res) => {
  try {
    const chats = await Chat.find({ uid: req.params.uid });
    res.json(chats);
  } catch (error) {
    res.status(500).send('Error fetching chats');
  }
});

module.exports = router;
