import { fastify } from 'fastify'

const PORT = 3333
const app = fastify()

app.get('/', () => {
  return 'Hello World'
})

app
  .listen({ port: PORT })
  .then(() => {
    console.log(`🚀 server running on http://localhost:${PORT}`)
  })
  .catch((error) => {
    console.error({
      message: 'Something wen wrong!',
      error,
    })
  })
