import express, { Router } from "express";
import { isAuthorized } from '@tinacms/auth'
import { createMediaHandler } from 'next-tinacms-s3/dist/handlers'
import bodyParser from 'body-parser'

const app = express();

const router = Router()

app.use(bodyParser.json());

const mediaHandler = createMediaHandler({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || '',
      secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
    region: process.env.S3_REGION || '',
    endpoint: process.env.S3_ENDPOINT || '',
  },
  bucket: process.env.S3_BUCKET || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV == 'development') {
        return true
      }

      const user = await isAuthorized(req)

      return user && user.verified
    } catch (e) {
      console.error(e)
      return false
    }
  },
},
{
  cdnUrl: process.env.S3_CDN || ''
})

router.use('/s3/media', (req, res) => {
  req.url = req.originalUrl
  return mediaHandler(req, res)
})

router.get('/s3/media', mediaHandler)

router.post('/s3/media', mediaHandler)

router.delete('/s3/media/:media', (req, res) => {
  req.query.media = ['media', req.params.media]
  return mediaHandler(req, res)
})

app.use('/', router)

// 导出处理函数
export default app;
