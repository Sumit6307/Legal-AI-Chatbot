const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Case', caseSchema);