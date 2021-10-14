const apiConnection = require("../../nodeConnection");
const dbConnection = require("../../dbConnection");

const connectDb = dbConnection.getDbConnection().then((db) => {
    db.connect().then(console.log("Connected to PostgreSQL from Server"));
    return db;
});


const connectApi = apiConnection.getNodeConnection().then((api) => {
    return api;
});

exports.getLastBlock = (client) => {
    connectApi.then( async (api) => {
        client.send(await api.rpc.chain.getBlock())
    });
}

exports.getBlockHashByNumber = (client, blockNumber) => {
    connectApi.then( async (api) => {
        client.send(await api.rpc.chain.getBlockHash(blockNumber))
    });
}

exports.getXBlocksAfterN = (client, X, N) => {
    connectApi.then((api) => {
        let i = 1;
        let blocks = [];
        let completed = 0;
    
        while (i <= X) {
          api.rpc.chain
            .getBlockHash(N - i)
            .then((data) => {
              completed++;
              blocks.push(data);
              if (completed == X) {
                client.send(blocks);
              }
            })
    
          i++;
        }
    });
}

exports.getAccountsCount = (client) => {
    connectDb.then(db => {
        db.query(`SELECT COUNT(DISTINCT recipient)+COUNT(DISTINCT sender) AS count FROM transactions`,
        (err, result) => {
            if(!err){ 
                client.send(JSON.stringify(result.rows));
            }
        })
    })
}

exports.getAddressTransactionsCount = (client, accountId) => {
    connectDb.then(db => {
        db.query(`SELECT COUNT(*) AS count FROM transactions WHERE sender='${accountId}' OR recipient='${accountId}'`,
        (err, result) => {
            if(!err){
                client.send(JSON.stringify(result.rows))
            }
        })
    })
}

exports.getAddressTransactions = (client, accountId) => {
    connectDb.then(db => {
        db.query(`SELECT * FROM transactions WHERE recipient='${accountId}' OR sender='${accountId}'`,
        (err, result) => {
            if(!err){ 
                client.send(JSON.stringify(result.rows));
            }
            
        })
    })
}

exports.getAccountBalance = (client, accountId) => {
    connectApi.then( async (api) => {
        client.send(await api.query.system.account(accountId))
    }); 
}

exports.getTransactionsCount = (client) => {
    connectDb.then(db => {
        db.query(`SELECT COUNT(*) AS count FROM transactions`,
        (err, result) => {
            if(!err){ 
                client.send(JSON.stringify(result.rows));
            }
        })
    })
}

exports.getTransactionsFromBlock = (client, blockHash) => {
    connectDb.then(db => {         
        db.query(`SELECT * FROM transactions WHERE block_hash='${block}'`,
        (err, result) => {
            if(!err){ 
                client.send(JSON.stringify(result.rows));
            }  
        })
    })
}

exports.getTransactionByHash = (client, transactionHash) => {
    connectDb.then(db => {        
        db.query(`SELECT * FROM transactions WHERE hash='${transactionHash}'`,
        (err, result) => {
            if(!err){ 
                client.send(JSON.stringify(result.rows));
            }
        })
    })
}

exports.getXtransactionsAfterN = (client, x, n) => {
    connectDb.then(db => {              
        db.query(`SELECT * FROM transactions WHERE id < ${n} AND id > ${n} - ${x} LIMIT ${x}`,
        (err, result) => {
            if(!err){ 
                client.send(JSON.stringify(result.rows));
            }
        })
    })
}