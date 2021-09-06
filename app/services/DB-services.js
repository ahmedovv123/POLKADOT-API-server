const dbConnection = require("../../dbConnection");

const connectDb = dbConnection.getDbConnection().then((db) => {
    return db;
});

exports.getAddressTransactions = async req => {
    //TODO: get transactions from database by address id
}