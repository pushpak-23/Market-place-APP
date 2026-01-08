const Minio = require('minio')

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,     // e.g. localhost
  port: Number(process.env.MINIO_PORT),     // 9000
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
})

const BUCKET = 'crop-images'

async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET)
  if (!exists) {
    await minioClient.makeBucket(BUCKET)
    console.log('✅ MinIO bucket created:', BUCKET)
  }
}

ensureBucket()

module.exports = { minioClient, BUCKET }
