const express = require('express');
const Case = require('../models/Case');
const router = express.Router();

router.post('/', async (req, res) => {
  const { uid, name, status } = req.body;
  try {
    const newCase = new Case({ uid, name, status });
    await newCase.save();
    res.json(newCase);
  } catch (error) {
    res.status(500).send('Error creating case');
  }
});

router.get('/:uid', async (req, res) => {
  try {
    const cases = await Case.find({ uid: req.params.uid });
    res.json(cases);
  } catch (error) {
    res.status(500).send('Error fetching cases');
  }
});

module.exports = router;