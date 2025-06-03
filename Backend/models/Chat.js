const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  messages: [{ role: { type: String, enum: ['user', 'assistant'] }, content: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
