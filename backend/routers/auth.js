const express = require('express')

const { isAllowEmailDomain } = require('../validators/authValidator')
const { getTokenData } = require('../helpers/googleApis')
const { createNewUser, getUserByGoogleId } = require('../helpers/account')
const { generateAuthToken } = require('../helpers/auth')

const router = express()

// Account Authentication with Google Sign-in
router.post('/', async (req, res) => {
    const authData = req.body
    const emailDomain = authData.user.email.split('@')[1]

    if (!isAllowEmailDomain(emailDomain)) res.status(400).send({error: 'This account has no permission to perform the authentication.'})

    try {
        const tokenData = await getTokenData(authData.accessToken)

        // If user id in token data not match with requested one, then reject it
        if (tokenData.user_id !== authData.user.id) res.status(400).send({error: 'Authentication ID not match.'})

        // If not user inside the collection then create one and response back the user data
        let user = await getUserByGoogleId(authData.user.id)
        if (user == null) user = await createNewUser(authData.user)

        // Generate authentication token
        const authToken = await generateAuthToken(user._id)

        res.json({user: user, token: authToken})

    } catch (error) {
        console.log(error)
        res.status(400).send({error: 'Authentication Error'})
    }
})