import { FastifyInstance } from 'fastify'
import { z as zod } from 'zod'
import { streamToResponse, OpenAIStream } from 'ai'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'

export const generateAICompletionRoute = async (app: FastifyInstance) => {
  app.post('/ai/completion', async (request, reply) => {
    const bodySchema = zod.object({
      videoId: zod.string().uuid(),
      prompt: zod.string(),
      temperature: zod.number().min(0).max(1).default(0.5),
    })
    const { prompt, videoId, temperature } = bodySchema.parse(request.body)
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

    const promptMessage = prompt.replace('{transcription}', video.transcription)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        {
          role: 'user',
          content: promptMessage,
        },
      ],
      stream: true,
    })

    const stream = OpenAIStream(response)

    streamToResponse(stream, reply.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Acces-Control-Allow-Mthods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
    })

    // return reply.status(200).send({
    //   message: 'Completions created successfully.',
    //   data: response,
    // })
  })
}
