const jwt = require('jsonwebtoken');

function genAccesToken(user){
    return jwt.sign(
        {
          userInfo: {
            id: user._id,
            name: user.name,
            email: user.email//remove in future, but...
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCCES_TOKEN_EXPIRE }
      )
}

function genRefreshToken(user){
    return jwt.sign(
        {
          userInfo: {
            id: user._id,
            name: user.name,
            email: user.email//remove in future, but...
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
      )
}

function clearCookies(res) {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}

module.exports = {
    genAccesToken,
    genRefreshToken,
    clearCookies
}