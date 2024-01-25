const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    if(req.id){//already checked
        return next()
    }
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized (no auth bearer)' })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden (jwt veirfy false)' })
        }
        req.id = decoded.userInfo.id
        return next()
    })
}
module.exports = verifyJWT
