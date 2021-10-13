const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const apiConnection = require("./nodeConnection");

const connectApi = apiConnection.getNodeConnection().then((api) => {
    return api;
});

// Spinning the http server and the websocket server
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000')

const wsServer = new webSocketServer({
    httpServer: server
});

let client = {};

wsServer.on('request', function (request) {
    
    console.log(new Date() + ' Recieved a new connection from origin ' + request.origin + '.');
   
    // We can rewrite this to accept requests only from allowed origin
    const connection = request.accept(null, request.origin);
    client = connection;
    

    connection.on('message', function (message) {
        if(message.type  === 'utf8') {
            
            switch(message.utf8Data) {
                case 'lastBlock':
                    connectApi.then( async (api) => {
                       client.send(await api.rpc.chain.getBlock())
                    });
                break;
                
            }
            
            
        }
    })
})
