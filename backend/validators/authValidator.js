// TODO: Remove 'kmitl' and 'google' from whitelist after development
const WHITELIST = ['it.kmitl.ac.th', 'kmitl.ac.th', 'gmail.com']

const isAllowEmailDomain = emailDomain => {
    return WHITELIST.includes(emailDomain)
}

module.exports = {
    isAllowEmailDomain
}
