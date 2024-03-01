const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true }
});

module.exports = mongoose.model('Thought', thoughtSchema);
s