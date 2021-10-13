const { ApiPromise, WsProvider } = require('@polkadot/api');

let api;

const getNodeConnection = async () => {

    if(api) return api;
  
    const provider = new WsProvider('ws://node1.blackseachain.com:9944');

    api = await ApiPromise.create({ provider });
    
    console.log("Creating new connection to node");
    return api;

    
}

module.exports = { getNodeConnection };



