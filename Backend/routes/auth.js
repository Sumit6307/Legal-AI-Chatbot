const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/profile', async (req, res) => {
  const { uid, name, email } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, name, email });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    res.status(500).send('Error saving profile');
  }
});

router.get('/profile/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    res.json(user);
  } catch (error) {
    res.status(500).send('Error fetching profile');
  }
});

router.put('/profile/:uid', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).send('Error updating profile');
  }
});

module.exports = router;
