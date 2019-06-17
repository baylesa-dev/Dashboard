import fs from 'fs'
import path from 'path'
import fastify from 'fastify'
import fastifyBlipp from 'fastify-blipp'
import fastifyCookie from 'fastify-cookie'
import fastifySession from 'fastify-session'

import Mongoose from 'mongoose'

import config from './config'
import { plugin as authPlugin } from './auth'
import routes from './routes'

const createServer = async() => {
    console.info(
        `Creating HTTPS server on 'http://${config.server.host}:${config.server.port}'...`
    )

    const server = fastify({
        http2: true,
        https: {
            allowHTTP1: true,
            key: fs.readFileSync(path.join(__dirname, '..', 'certs', 'server.key')),
            cert: fs.readFileSync(path.join(__dirname, '..', 'certs', 'server.crt'))
        },
        logger: {
            level: 'info'
        }
    })

    await server.register(fastifyCookie)
    await server.register(fastifySession, {
        secret: config.security.secret,
        cookie: {
            secure: false
        }
    })
    await server.register(fastifyBlipp)
    await server.register(authPlugin)

    await server.register(routes)

    await server.listen(config.server.port, config.server.host)

    await server.blipp()
}

const connectDatabase = async() => {
    const uri = `mongodb://${config.database.host}:${config.database.port}/${
        config.database.database
    }`

    console.info(`Connecting database on '${uri}'...`)

    await Mongoose.connect(uri, {
        useNewUrlParser: true
    })

    console.info(`Database connected on '${uri}'.`)
}

const main = async() => {
    try {
        await connectDatabase()
        await createServer()
    } catch (e) {
        console.error(e.message)
        process.exit(1)
    }
}

main()