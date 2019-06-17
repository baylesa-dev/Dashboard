const plugin = async(
    fastifyInstance,
    opts,
    next
) => {
    fastifyInstance.decorateRequest('user', null)
    fastifyInstance.decorateRequest('checkLogged', null)
    fastifyInstance.decorateRequest('checkAdmin', null)
    fastifyInstance.decorateRequest('isAdmin', null)
    fastifyInstance.decorateRequest('checkSame', null)
    fastifyInstance.decorateRequest('checkAdminOrSame', null)
    await next()
}

export default plugin