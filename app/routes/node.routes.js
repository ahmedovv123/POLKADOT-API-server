module.exports = app => {
    const node = require('../controllers/node.controller.js');

    var router = require('express').Router();

    // Get Block by number
    router.get("/blocks/num/:num", node.getBlockByNumber);

    // Get X blocks after N-th block from new to old
    router.get("/blocks/:x/:n", node.getXblocksAfterN);

    // Get Block by hash
    router.post("/blocks/hash", node.getBlockByHash);

    // Get address transactions
    router.get("/address/transactions/:adr", node.getAddressTransactions);

    // Get address balance
    router.get("/address/balance/:adr", node.getAddressBalance);

    // Get transactions from block
    router.post("transactions/block", node.getBlockTransactions);

    // Get lsat sync block
    router.get("/blocks", node.getBlock);

    app.use('/api/node', router);

};