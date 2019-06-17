import { UserModel } from '../data'

const middleware = async(req, res) => {
    // Inject user in request if token is provided
    const authToken = req.headers.authorization
    if (authToken) {
        const user = await UserModel.findOne({ token: authToken })
        if (user) {
            req.user = user
        }
    }

    // Inject helpers
    req.checkLogged = () => {
        if (!req.user) {
            res.status(401)
            throw Error('You have to be logged to access')
        }
    }

    req.checkAdmin = () => {
        if (!req.user || !req.user.admin) {
            res.status(401)
            throw Error('Admin rights are required to access')
        }
    }

    req.isAdmin = () => {
        return !req.user || !req.user.admin
    }

    req.checkSame = (id) => {
        if (!req.user || req.user._id.toString() !== id) {
            res.status(401)
            throw Error('You have to own this ressource to access')
        }
    }

    req.checkAdminOrSame = (id) => {
        if (!req.user || (req.user._id.toString() !== id && !req.user.admin)) {
            res.status(401)
            throw Error('You have to own this ressource to access')
        }
    }
}

export default middleware