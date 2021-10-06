module.exports = app => {
    const node = require('../controllers/node.controller.js');

    var router = require('express').Router();

/** 
* @swagger
* definitions: 
*   transaction:
*    type: object
*    properties:
*     hash:
*      type: string
*      description: hash of the transaction
*      example: '0xf854def41b4e5d356eee04e560f371baf89167ea21cff33606190532bae884c9'
*     isSigned:
*      type: boolean
*      description: if the transaction is signed
*      example: 'true' 
*     sender:
*      type: string
*      description: account id of transaction sender
*      example: '1743nDTMZisPgBCYSAgkUn1kVG7MePc9rvMEjoRNf4ipVkF' 
*     recipient:
*      type: string
*      description: account id of transaction recipient
*      example: '12Z6FSvMFRjno881i1qpFndrtZtcVCLs5v4nR92McQNX31CT' 
*     amount:
*      type: string
*      description: amount of DOT which is sent by sender
*      example: '5.357 DOT' 
*     method:
*      type: string
*      description: method which is used when signing the transaction
*      example: 'transfer, transferKeepAlive' 
*   Account:
*    type: object
*    properties:
*     feeFroze:
*      type: string
*      example: '0 DOT'
*     free:
*      type: string
*      example: '10 DOT'
*     misFrozen:
*      type: string
*     reserver:
*      type: string
*   Block:
*    type: object
*    properties:
*     blockNumber:
*      type: integer
*      example: 529352
*     blockHash:
*      type: string
*      example: '0xd518e818b934ac452d481bd4e60460af1abab77ab899967eb1b46fe7db86503c'
*     parentHash: 
*      type: string
*      example: '0x40c9f2a89143afe577b15569f4e63a76ff23733341b2c6a744b224933b045a9f'
*     stateRoot:
*      type: string
*      example: '0x2a73bf4be9d73ffd40a248b6cbe20c35d24f0b328b111e1f5979a5f38a69e91c'
*     extrinsicsRoot:
*      type: string
*      example: '0xdb6b60dfbf24117aeff2badbadcfd192d45b01221aad7cfe0d1666cd7e706437'
*   BlockByHash:
*    type: string
*    example: '0xd518e818b934ac452d481bd4e60460af1abab77ab899967eb1b46fe7db86503c'
*/ 

/**
 * @swagger
 * tags:
 *  - name: Transactions
 *    description: Transaction details
 *  - name: Accounts
 *    description: Account details
 *  - name: Blocks
 *    description: Block details
 */

/** 
 * @swagger
 * /blocks:
 *  get:
 *   summary: get address balance
 *   tags:
 *    - Blocks
 *   description: get last block
 *   responses:
 *    200:
 *     description: Last block
 *    500:
 *     description: failure fetching lsat block
 */

    // Get last sync block
    router.get("/blocks", node.getBlock);

/** 
 * @swagger
 * /blocks/num/{num}:
 *  get:
 *   summary: get block by number
 *   tags:
 *    - Blocks
 *   description: get single block providing number
 *   parameters:
 *    - in: path
 *      name: num
 *      schema:
 *       type: integer
 *      required: true
 *      description: number of block
 *      example: 1512531
 *   responses:
 *    200:
 *     description: Block with number
 *    500:
 *     description: failure fetching the block
 */

    // Get Block by number
    router.get("/blocks/num/:num", node.getBlockByNumber);

  /**
  * @swagger
  * /blocks/hash:
  *  post:
  *   summary: Get block by hash
  *   tags:
  *    - Blocks
  *   description: Get block by hash
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/BlockByHash'
  *   responses:
  *    200:
  *     description: Block by hash
  *    500:
  *     description: failure fetching block
  */   

    // Get Block by hash
    router.post("/blocks/hash", node.getBlockByHash);

/** 
 * @swagger
 * /blocks/{x}/{n}:
 *  get:
 *   summary: Get X blocks after N-th block from new to old
 *   tags:
 *    - Blocks
 *   description: Get X blocks after N-th block from new to old
 *   parameters:
 *    - in: path
 *      name: x
 *      schema:
 *       type: integer
 *      required: true 
 *      example: 10
 *    - in: path 
 *      name: n
 *      schema:    
 *       type: integer
 *      required: true
 *      description: number of block
 *      example: 1512531
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure fetching the block
 */

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

/** 
 * @swagger
 * /address/balance/{adr}:
 *  get:
 *   summary: get address balance
 *   tags:
 *    - transactions
 *   description: get balance of an address from node
 *   parameters:
 *    - in: path
 *      name: adr
 *      schema:
 *       type: string
 *      required: true
 *      description: id of account
 *      example: '1743nDTMZisPgBCYSAgkUn1kVG7MePc9rvMEjoRNf4ipVkF'
 *   responses:
 *    200:
 *     description: Balance of address
 *    500:
 *     description: failure fetching balance of address
 */
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