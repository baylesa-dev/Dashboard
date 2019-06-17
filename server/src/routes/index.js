import { middleware as authMiddleware } from '../auth'

import About from './About'
import User from './User'

const anonymousRoutes = [...About]
const protectedRoutes = [...User]

export const registerAnonymousRoutes = async(
    fastifyInstance, opts, next
) => {
    for (const route of anonymousRoutes) {
        await fastifyInstance.route(route)
    }
    next()
}

export const registerProtectedRoutes = async(
    fastifyInstance, opts, next
) => {
    await fastifyInstance.addHook('preHandler', authMiddleware)
    const pRoutes = [...protectedRoutes]
    for (const route of pRoutes) {
        await fastifyInstance.route(route)
    }
    next()
}

export const registerRoutes = async(
    fastifyInstance, opts, next
) => {
    fastifyInstance.register(registerAnonymousRoutes)
    fastifyInstance.register(registerProtectedRoutes)
    next()
}

export default registerRoutes