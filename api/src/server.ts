import { fastify } from 'fastify'
import { getAllPromptsRoute } from './routes/get-all-prompts'

const PORT = 3333
const app = fastify()

app.register(getAllPromptsRoute)

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
