const express = require('express')
const db = require('../config/db')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Buyer shows interest
router.post('/', authMiddleware, async (req, res) => {
  try {
    const buyerId = req.user.userId || req.user.id
    const { cropId } = req.body

    await db.execute(
      `INSERT IGNORE INTO crop_interests (crop_id, buyer_id)
       VALUES (?, ?)`,
      [cropId, buyerId]
    )

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to send interest' })
  }
})

// Farmer fetches interests for their crops
router.get('/farmer', authMiddleware, async (req, res) => {
  try {
    const farmerId = req.user.userId || req.user.id

    const [rows] = await db.execute(`
      SELECT 
        ci.id,
        ci.created_at,
        c.name AS crop_name,
        u.email AS buyer_email
      FROM crop_interests ci
      JOIN crops c ON c.id = ci.crop_id
      JOIN users u ON u.id = ci.buyer_id
      WHERE c.farmer_id = ?
      ORDER BY ci.created_at DESC
    `, [farmerId])

    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to load interests' })
  }
})

module.exports = router
