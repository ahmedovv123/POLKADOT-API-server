const { ApiPromise, WsProvider } = require('@polkadot/api');

let api;

const getNodeConnection = async () => {

    if(api) 
    {
        console.log("Using existing connection");
        return api;
    }

    const provider = new WsProvider('ws://180.160.10.1:9944');

    api = await ApiPromise.create({ provider });
   
    console.log("Creating new connection to node");
    return api;

    
}

module.exports = { getNodeConnection };



