const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/test', async (req, res) => {
  const { data, error } = await supabase
    .from('inventory') // your table name
    .select('*')
    .limit(1);

  if (error) {
    return res.status(500).json(error);
  }

  res.json({
    message: 'Supabase connected successfully',
    data
  });
});

module.exports = router;