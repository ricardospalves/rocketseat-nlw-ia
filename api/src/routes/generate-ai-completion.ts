import { FastifyInstance } from 'fastify'
import { z as zod } from 'zod'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'

export const generateAICompletionRoute = async (app: FastifyInstance) => {
  app.post('/ai/completion', async (request, reply) => {
    const bodySchema = zod.object({
      videoId: zod.string().uuid(),
      template: zod.string(),
      temperature: zod.number().min(0).max(1).default(0.5),
    })
    const { template, videoId, temperature } = bodySchema.parse(request.body)
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    })

    if (!video.transcription) {
      return reply.status(400).send({
        message: 'Video transcription was not generated yet.',
      })
    }

    const promptMessage = template.replace(
      '{transcription}',
      video.transcription,
    )

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        {
          role: 'user',
          content: promptMessage,
        },
      ],
    })

    return reply.status(200).send({
      message: 'Completions created successfully.',
      data: response,
    })
  })
}
