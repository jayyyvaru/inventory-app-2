const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('locations').select('*');

    if (error) return res.status(400).json(error);

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE location
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    const { data, error } = await supabase
      .from('locations')
      .insert([{ name }])
      .select();

    if (error) return res.status(400).json(error);

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;