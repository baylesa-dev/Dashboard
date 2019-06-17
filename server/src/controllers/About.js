import { boomify } from '@hapi/boom'

export const about = async(req, res) => {
    try {
        const aboutData = {
            client: {
                host: req.raw.connection.remoteAddress
            },
            server: {
                current_time: Date.now()
            }
        }

        return aboutData
    } catch (e) {
        throw boomify(e)
    }
}