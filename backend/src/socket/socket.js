const {authSocketMiddleware} = require('../middleware/authSocketMiddleware')
const socketio = require('socket.io');


function socketIo(server){
	const io = socketio(server);

io.use((socket, next) => {
  authSocketMiddleware(socket, next);
});


io.on('connection', (socket) => {
    socket.on('join_room', (itemID) => {
      socket.join(itemID);
    });
  
    socket.on('send_comment', ({text,itemID}) => {
      //if sockect non auth disconnect
      if(!socket.userInfo){
        return socket.disconnect();
      }
        const newComment = {
          date: Date.now(),
          text,
          author: socket.userInfo,
        };
      socket.to(itemID).emit('new_comment', newComment);
    });

    socket.on('leave_room', (itemID) => {
      socket.leave(itemID)
    });
});

}

module.exports = {socketIo}