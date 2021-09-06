module.exports = app => {
    const node = require('../controllers/node.controller.js');

    var router = require('express').Router();

    // Get Block by number
    router.get("/blocks/num/:num", node.getBlockByNumber);


    // Get X blocks after N-th block from new to old
    router.get("/blocks/:x/:n", node.getXblocksAfterN);

    // Get Block by hash
    router.post("/blocks/hash", node.getBlockByHash);

    // Get transactions from block by hash
    //router.post("/blocks/transactions/hash", node.getTransactionsFromBlockByHash);

    
    // Get X unconfirmed transactions after N-th transaction from new to old 
    TODO:

    // Get transaction details by hash
    // router.get("/transactions/hash/", node.getTransactionByHash);

    // Get details of addresses
     router.get("/addresses/:adr", node.getAddress);

    // //Get X transactions from address after N-th transaction from new to old
    // TODO:

    // Get lsat sync block
    router.get("/blocks", node.getBlock);

    app.use('/api/node', router);

};