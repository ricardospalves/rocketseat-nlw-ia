import { fastify } from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'

const PORT = 3333
const MEGABYTE = 1_048_576
const app = fastify()

app.register(fastifyMultipart, {
  limits: {
    fileSize: MEGABYTE * 25, // 25mb
  },
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)

app
  .listen({ port: PORT })
  .then(() => {
    console.log(`🚀 server running on http://localhost:${PORT}`)
  })
  .catch((error) => {
    console.error({
      message: 'Something went wrong!',
      error,
    })
  })
