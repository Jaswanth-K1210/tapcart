const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

// Load environment variables first
dotenv.config();
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8081', 'http://10.0.2.2:5000'], // Added localhost:8081 for Metro
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Smart Tap-to-Shop API is running...');
});

app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});