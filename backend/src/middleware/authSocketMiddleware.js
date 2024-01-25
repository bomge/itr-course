const jwt = require('jsonwebtoken');
function authSocketMiddleware(socket, next){
	const token = socket.handshake.auth?.token;
	if (token){
	  jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		async (err, decoded) => {
		  if (err) {
			const err = new Error("not authorized");
			return next(err);
		  }
		  const {userInfo: {id, name}} = decoded
		  socket.userInfo = {_id: id, name}
		  next()
		}
	  );
	} else {
	  next()
	}
  }

  module.exports = {
	authSocketMiddleware
  }