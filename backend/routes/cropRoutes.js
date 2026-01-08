const express = require('express')
const multer = require('multer')
const { v4: uuid } = require('uuid')
const { minioClient, BUCKET } = require('../config/minio')
const db = require('../config/db')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post(
  '/',
  authMiddleware,
  upload.array('images', 5),
  async (req, res) => {
    try {
      console.log('USER:', req.user)
      console.log('BODY:', req.body)
      console.log('FILES:', req.files?.length)

      const { name, quantity, quality, price, location } = req.body
      const farmerId = req.user.userId || req.user.id

      const priceNumber = Number(price)
      if (isNaN(priceNumber)) {
        return res.status(400).json({ message: 'Price must be numeric' })
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' })
      }

      // 1️⃣ Insert crop
      const [result] = await db.execute(
        `INSERT INTO crops (farmer_id, name, quantity, quality, price, location)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [farmerId, name, quantity, quality, priceNumber, location]
      )

      const cropId = result.insertId
      const imageUrls = []

      // 2️⃣ Upload images to MinIO
      for (const file of req.files) {
        const objectName = `${cropId}/${uuid()}-${file.originalname}`

        await minioClient.putObject(
          BUCKET,
          objectName,
          file.buffer,
          file.size,
          { 'Content-Type': file.mimetype }
        )

        const imageUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET}/${objectName}`

        imageUrls.push(imageUrl)

        await db.execute(
          `INSERT INTO crop_images (crop_id, image_url)
           VALUES (?, ?)`,
          [cropId, imageUrl]
        )
      }

      res.status(201).json({
        success: true,
        cropId,
        images: imageUrls
      })
    } catch (err) {
      console.error('❌ CROP UPLOAD ERROR:', err)
      res.status(500).json({
        message: 'Crop upload failed',
        error: err.message
      })
    }
  }
)
router.get('/', async (req, res) => {
  try {
    const [crops] = await db.execute(`
      SELECT c.id, c.name, c.quantity, c.quality, c.price, c.location
      FROM crops c
      ORDER BY c.created_at DESC
    `)

    for (const crop of crops) {
      const [images] = await db.execute(
        `SELECT image_url FROM crop_images WHERE crop_id = ?`,
        [crop.id]
      )

      crop.images = images.map(i => i.image_url)
    }

    res.json(crops)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch crops' })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const cropId = req.params.id

    const [[crop]] = await db.execute(
      `SELECT * FROM crops WHERE id = ?`,
      [cropId]
    )

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' })
    }

    const [images] = await db.execute(
      `SELECT image_url FROM crop_images WHERE crop_id = ?`,
      [cropId]
    )

    crop.images = images.map(i => i.image_url)

    res.json(crop)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to load crop' })
  }
})
module.exports = router
