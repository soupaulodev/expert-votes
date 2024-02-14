import { fastify } from 'fastify';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import cookie from '@fastify/cookie';

const app = fastify()
const appPort = 5000

app.register(cookie, {
    secret: "9eb30e05-0647-4c5d-a4b3-eb36927f8aaa",
    hook: "onRequest",
})

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.listen({ port: appPort }).then(() => {
    console.log(`
    HTTP server running!
    local: http://localhost:${appPort}/
    `)
})