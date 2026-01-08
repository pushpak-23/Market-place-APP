const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

// SIGNUP
const signup = async (req, res) => {
  const { email, password, role, phone } = req.body

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Check existing user
    const [[existing]] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    )

    if (existing) {
      return res.status(409).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user
    const [result] = await db.execute(
      `INSERT INTO users (email, password, role, phone)
       VALUES (?, ?, ?, ?)`,
      [email, hashedPassword, role, phone || null]
    )

    const token = jwt.sign(
      { userId: result.insertId, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(201).json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Signup failed' })
  }
}

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' })
  }

  try {
    const [[user]] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Login failed' })
  }
}

module.exports = { signup, login }
