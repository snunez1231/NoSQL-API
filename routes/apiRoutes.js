const express = require('express');
const router = express.Router();
const { User, Thought, Reaction } = require('../models');

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new user
router.post('/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new thought
router.post('/thoughts', async (req, res) => {
  const thought = new Thought({
    thoughtText: req.body.thoughtText,
    username: req.body.username
  });

  try {
    const newThought = await thought.save();
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reaction = new Reaction({
      reactionBody: req.body.reactionBody,
      username: req.body.username
    });
    thought.reactions.push(reaction);
    await thought.save();
    res.status(201).json(reaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a thought and its reactions
router.delete('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    await Reaction.deleteMany({ _id: { $in: thought.reactions } });
    await thought.remove();
    res.json({ message: 'Thought and its reactions deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
