const { getUserIdFromToken } = require('../helpers/auth')

const AUTH_TOKEN_HEADER_NAME = 'schedu-token'

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers[AUTH_TOKEN_HEADER_NAME]
        const userId = await getUserIdFromToken(token)
        if (!userId) throw 'UserID not found'
        next()
    } catch (error) {
        res.status(403).send({ message: 'Unauthorized Request' })
    }
}

module.exports = {
    authMiddleware
}
