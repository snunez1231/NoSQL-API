const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true },
  username: { type: String, required: true }
});

module.exports = mongoose.model('Reaction', reactionSchema);
