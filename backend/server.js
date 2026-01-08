const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');  // Import the DB pool
const cropRoutes = require('./routes/cropRoutes')
const interestRoutes = require('./routes/interestRoutes')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow frontend access
app.use(express.json()); // Parse JSON bodies

app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes)
app.use('/api/interests', interestRoutes)
app.get('/', (req, res) => {
  res.send('Backend API running');
});

// Test DB connection and print status
db.execute('SELECT 1')
  .then(() => {
    console.log('✅ Database connected successfully (MariaDB)');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Root endpoint: http://localhost:${PORT}/`);
});