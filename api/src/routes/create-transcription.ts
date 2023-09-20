import { createReadStream } from 'node:fs'
import { FastifyInstance } from 'fastify'
import { z as zod } from 'zod'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'

export const createTranscriptionRoute = async (app: FastifyInstance) => {
  app.post('/video/:videoId/transcription', async (request, reply) => {
    const paramsSchema = zod.object({
      videoId: zod.string().uuid(),
    })
    const bodySchema = zod.object({
      prompt: zod.string(),
    })
    const { videoId } = paramsSchema.parse(request.params)
    const { prompt } = bodySchema.parse(request.body)
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    })
    const videoPath = video.path
    const audioReadStream = createReadStream(videoPath)

    try {
      const response = await openai.audio.transcriptions.create({
        file: audioReadStream,
        model: 'whisper-1',
        language: 'pt',
        response_format: 'json',
        temperature: 0,
        prompt,
      })
      const transcription = response.text

      await prisma.video.update({
        where: {
          id: videoId,
        },
        data: {
          transcription,
        },
      })

      return reply.status(201).send({
        message: 'Transcript created successfully.',
        transcription,
      })
    } catch (error) {
      console.error(error)

      return reply.status(500).send({
        message: 'Something went wrong',
        error,
      })
    }
  })
}
