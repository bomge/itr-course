const jwt = require('jsonwebtoken')

const addUserInfo = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
        return next()
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
           return next()
        }
        req.id = decoded.userInfo.id
        return next()
    })
}
module.exports = addUserInfo
