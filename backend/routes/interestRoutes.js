const express = require('express')
const db = require('../config/db')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Buyer sends interest
router.post('/', authMiddleware, async (req, res) => {
  try {
    const buyerId = req.user.userId
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

// Farmer views interests
router.get('/farmer', authMiddleware, async (req, res) => {
  try {
    const farmerId = req.user.userId

    const [rows] = await db.execute(`
      SELECT
        c.id AS crop_id,
        c.name AS crop_name,
        COUNT(ci.id) AS interest_count
      FROM crops c
      LEFT JOIN crop_interests ci ON ci.crop_id = c.id
      WHERE c.farmer_id = ?
      GROUP BY c.id
      ORDER BY interest_count DESC
    `, [farmerId])

    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to load interests' })
  }
})

router.get('/check/:cropId', authMiddleware, async (req, res) => {
  const buyerId = req.user.userId
  const cropId = req.params.cropId

  const [[row]] = await db.execute(
    `SELECT id FROM crop_interests WHERE crop_id = ? AND buyer_id = ?`,
    [cropId, buyerId]
  )

  res.json({ interested: !!row })
})
router.get('/crop/:cropId', authMiddleware, async (req, res) => {
  try {
    const farmerId = req.user.userId
    const cropId = req.params.cropId

    const [buyers] = await db.execute(`
      SELECT 
        u.id,
        u.email,
        u.phone
      FROM crop_interests ci
      JOIN users u ON u.id = ci.buyer_id
      JOIN crops c ON c.id = ci.crop_id
      WHERE ci.crop_id = ? AND c.farmer_id = ?
    `, [cropId, farmerId])

    res.json(buyers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to load buyers' })
  }
})

module.exports = router
