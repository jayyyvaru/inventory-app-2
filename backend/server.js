require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');

const app = express();

// ✅ Use PORT from .env or fallback to 5001
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Inventory Server Running (Supabase)');
});

app.listen(PORT, () => {
  console.log(` Supabase Server running on port ${PORT}`);
});