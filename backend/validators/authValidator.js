const WHITELIST = ['@it.kmitl.ac.th']

const isAllowEmailDomain = (emailDomain) => {
    return WHITELIST.includes(emailDomain)
}

module.exports = {
    isAllowEmailDomain
}