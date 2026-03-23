const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// GET all products (with optional location filter)
router.get('/', async (req, res) => {
  try {
    const { location_id } = req.query;

    let query = supabase.from('products').select('*');

    if (location_id) {
      query = query.eq('location_id', location_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// CREATE product (with location_id)
router.post('/', async (req, res) => {
  console.log("🔥 POST HIT");
  console.log("BODY:", req.body);

  const { name, price, quantity, location_id } = req.body;

  const { data, error } = await supabase
    .from('products')
    .insert([{ name, price, quantity, location_id }])
    .select();

  console.log("SUPABASE DATA:", data);
  console.log("SUPABASE ERROR:", error);

  if (error) return res.status(400).json(error);

  res.status(201).json(data);
});

// UPDATE product
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('products')
      .update(req.body)
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;