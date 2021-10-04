module.exports = app => {
    const node = require('../controllers/node.controller.js');

    var router = require('express').Router();

     // Get last sync block
     router.get("/blocks", node.getBlock);

    // Get Block by number
    router.get("/blocks/num/:num", node.getBlockByNumber);

    // Get Block by hash
    router.post("/blocks/hash", node.getBlockByHash);

    // Get X blocks after N-th block from new to old
    router.get("/blocks/:x/:n", node.getXblocksAfterN);

    

    ///////////////////////// ACCOUNTS ////////////////////////////////

    //Get accounts count
    router.get('/accounts/count', node.getAccountsCount);

    // Get adress transactions count 
    router.get("/address/transactions/count/:adr", node.getAddressTransactionsCount);

    // Get address transactions
    router.get("/address/transactions/:adr", node.getAddressTransactions);

    // Get address balance
    router.get("/address/balance/:adr", node.getAddressBalance);

    // Get X transactions after Nth of account
    router.post('/address/transactions/:x/:n', node.getXTransactionsAfterNthFromAcc)

    ///////////////////////  TRANSACTIONS ///////////////////////////

    // Get count of transactions
    router.get('/transactions/count', node.getTransactionsCount);

    // Get transactions from block
    router.post("/transactions/block", node.getBlockTransactions);

    // Get Transaction details by hash
    router.post("/transactions/hash", node.getTransactionByHash);

    // Get last X transactions after Nth
    router.get('/transactions/:x/:n', node.getXTransactionsAfterNth)

    

   

    app.use('/api/node', router);

};