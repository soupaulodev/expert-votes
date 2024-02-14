import { fastify } from 'fastify';
import { createPoll } from './routes/create-poll';

const app = fastify()
const appPort = 5000

app.register(createPoll)

app.listen({ port: appPort }).then(() => {
    console.log(`
    HTTP server running!
    local: http://localhost:${appPort}/
    `)
})