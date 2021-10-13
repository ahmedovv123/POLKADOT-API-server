const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000')

const wsServer = new webSocketServer({
    httpServer: server
});

const clients = {};

// this code generate unique userid of everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0*10000).toString(16).substring(1);
    return s4() + s4() + "-" + s4();
}

wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log(new Date() + ' Recieved a new connection from origin ' + request.origin + '.');

    // We can rewrite this to accept requests only from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', function (message) {
        if(message.type  === 'utf8') {
            console.log('Received Message: ', message.utf8Data);

            // broadcasting message to all connected clients
            for(key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log('sent Message to: ', clients[key]);
            }
        }
    })
})
