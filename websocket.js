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
        let msg;
        try {
            msg = JSON.parse(message.utf8Data);
        } catch (error) {
            client.send('Parse error')
            return;
        }
        if(message.type  === 'utf8') {
            
            switch(msg.method) {
                case 'rpc_getLastBlock':
                    connectApi.then( async (api) => {
                       client.send(await api.rpc.chain.getBlock())
                    });
                break;
                
            }
            
            
        }
    })
})
