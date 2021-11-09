const axios = require('axios')

// Check data from the access_token
const getTokenData = async (accessToken) => {
    const tokenResult = await axios.post(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
    const tokenData = tokenResult.data
    return tokenData
}

module.exports = {
    getTokenData
}