const dbConnection = require("../../dbConnection");

const connectDb = dbConnection.getDbConnection().then((db) => {
    return db;
});


exports.getAddressTransactions = (req, res) => {

    const address = req.params.adr.toString();
    
    connectDb.then(db => {
        
        db.connect().then(console.log("Connected to PostgreSQL from Server"));

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
        
        db.connect().then(console.log("Connected to PostgreSQL from Server"));

        db.query(`SELECT * FROM transactions WHERE block_hash='${block}'`,
        (err, result) => {
            if(!err){ 
                res.send(result.rows);
            }
            
        })
    })
}