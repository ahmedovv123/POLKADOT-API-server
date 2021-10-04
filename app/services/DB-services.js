const dbConnection = require("../../dbConnection");

const connectDb = dbConnection.getDbConnection().then((db) => {
    db.connect().then(console.log("Connected to PostgreSQL from Server"));
    return db;
});


exports.getAddressTransactions = (req, res) => {

    const address = req.params.adr.toString();
    
    connectDb.then(db => {
        
        db.query(`SELECT * FROM transactions WHERE recipient='${address}' OR sender='${address}'`,
        (err, result) => {
            if(!err){ 
                res.send(result.rows);
            }
            
        })
    })

}

exports.getBlockTransactions = (req, res) => {

    const block = req.body.blockHash;
    
    connectDb.then(db => {
        
        db.query(`SELECT * FROM transactions WHERE block_hash='${block}'`,
        (err, result) => {
            if(!err){ 
                res.send(result.rows);
            }
            
        })
    })
}

exports.getTransactionByHash = (req, res) => {

    const transactionHash = req.body.transactionHash;
    
    connectDb.then(db => {
        
        db.query(`SELECT * FROM transactions WHERE hash='${transactionHash}'`,
        (err, result) => {
            if(!err){ 
                res.send(result.rows);
            }
            
        })
    })
}

exports.getXTransactionsAfterNth = (req, res) => {
    connectDb.then(db => {
        const X = parseInt(req.params.x);
        const N = req.params.n;

        db.query(`SELECT * FROM transactions WHERE id < ${N} AND id > ${N} - ${X} LIMIT ${X}`,
        (err, result) => {
            if(!err){ 
                res.send(result.rows);
            }else{
                res.status(500).send({
                    message: err.message || "Some error occured"
                });
            }
            
        })

    })
}

exports.getXTransactionsAfterNthFromAcc = (req, res) => {
    connectDb.then(db => {
        const X = parseInt(req.params.x);
        const N = req.params.n;
        const accountId = req.body.accountId

        db.query(`SELECT * FROM transactions WHERE id < ${N} AND id > ${N} - ${X} AND (recipient='${accountId}' OR sender='${accountId}') LIMIT ${X}`,
        (err, result) => {
            if(!err){ 
                res.send(result.rows);
            }else{
                res.status(500).send({
                    message: err.message || "Some error occured"
                });
            }
            
        })

    })
}



exports.getTransactionsCount = (req, res) => {
    connectDb.then(db => {
        
        db.query(`SELECT COUNT(*) AS count FROM transactions`,
        (err, result) => {
            if(!err){ 
                res.send(result.rows);
            }
            
        })
    })
}

exports.getAccountsCount = (req, res) => {
    connectDb.then(db => {
        
        db.query(`SELECT COUNT(DISTINCT recipient)+COUNT(DISTINCT sender) AS count FROM transactions`,
        (err, result) => {
            if(!err){ 
                res.send(result.rows);
            }
        })
    })
}

exports.getAddressTransactionsCount = (req, res) => {
    connectDb.then(db => {
        const accountId = req.params.adr.toString();
        db.query(`SELECT COUNT(*) AS count FROM transactions WHERE sender='${accountId}' OR recipient='${accountId}'`,
        (err, result) => {
            if(!err){
                res.send(result.rows)
            }
        })
    })
}