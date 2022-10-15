const socketHandler =  {
    getSocketConnected:(io) => {
        io.on("connection", (socket) => {
            console.log("Socket connected "+ socket.id);

            socket.on("join",({roomId}) => {
                socket.join(roomId);
                console.log("User joined room "+roomId);
                io.to(roomId).emit("Joined",{
                    roomId
                });
            });

            socket.on("CODE_CHANGE",({roomID,code}) => {
                console.log("Code change detected : "+roomID);
                socket.in(roomID).emit("SYNC_CODE",{
                    code
                });
            });

            socket.on("end", ({roomId}) => {
                console.log("user left the room: "+ roomId)
                socket.disconnect(0)
            })
        });
    }
};

module.exports = socketHandler;