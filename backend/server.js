require('dotenv').config()

const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const cropRoutes = require('./routes/cropRoutes')
const interestRoutes = require('./routes/interestRoutes')
const db = require('./config/db')

const app = express()
const PORT = process.env.PORT || 3000

// ✅ CORRECT CORS CONFIG
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

// ✅ THIS IS ENOUGH FOR PREFLIGHT
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/crops', cropRoutes)
app.use('/api/interests', interestRoutes)

app.get('/', (req, res) => {
  res.send('Backend API running')
})

// DB check
db.execute('SELECT 1')
  .then(() => console.log('✅ Database connected successfully (MariaDB)'))
  .catch(err => console.error('❌ Database connection failed:', err.message))

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
