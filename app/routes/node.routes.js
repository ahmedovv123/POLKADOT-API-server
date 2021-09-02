module.exports = app => {
    const node = require('../controllers/node.controller.js');

    

    // Get Block by number
    app.get("/blocks/num/:num", node.getBlockByNumber);


    // Get X blocks after N-th block from new to old
    app.get("/blocks/:x/:n", node.getXblocksAfterN);

    // Get Block by hash
    app.post("/blocks/hash/", node.getBlockByHash);

    // Get transactions from block by hash
    app.post("/blocks/transactions/hash/", node.getTransactionsFromBlockByHash);

    
    // Get X unconfirmed transactions after N-th transaction from new to old 
    TODO:

    // Get transaction details by hash
    //app.get("/transactions/hash/", node.getTransactionByHash);

    // // Get details of addresses
    // router.post("/addresses/:adr", node.getAddress);

    // //Get X transactions from address after N-th transaction from new to old

    app.get("/transactions", node.getUnconfirmedTransactionOfAddressAfterN);

    app.get("/address/:address", node.getAddressInformation);

    // Get lsat sync block
    app.get("/blocks", node.getBlock);

    

};
