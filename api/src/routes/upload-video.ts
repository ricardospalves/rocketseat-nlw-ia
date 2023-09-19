import path from 'node:path'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

const pump = promisify(pipeline)

const ALLOWED_FILE_TYPES = ['.mp3']

export const uploadVideoRoute = async (app: FastifyInstance) => {
  app.post('/video', async (request, reply) => {
    const data = await request.file()

    if (!data) {
      return reply.status(400).send({
        error: 'Missing file input.',
      })
    }

    const extension = path.extname(data.filename)

    if (!ALLOWED_FILE_TYPES.includes(extension)) {
      return reply
        .status(400)
        .send({ error: 'Invalid input type. Please, upload a MP3 file.' })
    }

    const fileBaseName = path.basename(data.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
    const uploadDestination = path.resolve(
      __dirname,
      '../../tmp',
      fileUploadName,
    )

    await pump(data.file, fs.createWriteStream(uploadDestination))

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      },
    })

    return reply.status(200).send({
      message: 'Video sent successfully.',
      data: video,
    })
  })
}
