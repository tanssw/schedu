const express = require('express')

const { isAllowEmailDomain } = require('../validators/authValidator')
const { getTokenData } = require('../helpers/googleApis')
const { createNewUser, getUserByGoogleId, getUserByObjectId } = require('../helpers/account')
const { generateAuthToken, getUserIdFromToken, deleteAuthToken } = require('../helpers/auth')
const { authMiddleware } = require('../middlewares/auth')

const router = express()

// Account Authentication with Google Sign-in
router.post('/', async (req, res) => {
    const authData = req.body
    const emailDomain = authData.user.email.split('@')[1]

    if (!isAllowEmailDomain(emailDomain))
        res.status(403).send({
            error: 'This account has no permission to perform the authentication.'
        })

    try {
        const tokenData = await getTokenData(authData.accessToken)

        // If user id in token data not match with requested one, then reject it
        if (tokenData.user_id !== authData.user.id)
            res.status(403).send({ error: 'Authentication ID not match.' })

        // If not user inside the collection then create one and response back the user data
        let user = await getUserByGoogleId(authData.user.id)
        if (user == null) user = await createNewUser(authData.user)

        // Generate authentication token
        const authToken = await generateAuthToken(user._id)

        res.json({ user: user, token: authToken })
    } catch (error) {
        res.status(403).send({ error: 'Authentication Error' })
    }
})

// Account Authentication with Token
router.post('/token', async (req, res) => {
    const token = req.body.token
    try {
        const userObjectId = await getUserIdFromToken(token)
        const user = await getUserByObjectId(userObjectId)
        res.json({ user: user })
    } catch (error) {
        res.status(403).send({ error: 'Authentication Error' })
    }
})

// Delete Account Token
router.delete('/', authMiddleware, async (req, res) => {
    try {
        const token = req.headers['schedu-token']
        await deleteAuthToken(token)
        res.json({ message: 'Account has been successfully signed-out' })
    } catch (error) {
        res.status(500).send({ message: 'Error occured while signing out from the system' })
    }
})

module.exports = router
