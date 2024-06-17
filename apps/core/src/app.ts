import fastify from 'fastify';
import chalk from 'chalk';


const server = fastify()
server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

const log = console.log;
const error = console.error;

const _error = chalk.bold.red;
const _greenBG = chalk.bold.bgGreen;

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    error(_error('Error starting server'))
    process.exit(1)
  }
  log(_greenBG(`Server listening at ${address}`))
})