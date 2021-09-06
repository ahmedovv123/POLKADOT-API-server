const { Client } = require("pg");

let client;

const getDbConnection = async () => {

    if(client) return client;

    const newClient = new Client({
        host: "postgreSql-container",
        user: "postgres",
        port: "5432",
        password: "root",
        database: "polkadot_explorer",
    });

    console.log("Creating connection to DB from NodeJS server");
    return newClient;

}

module.exports = {getDbConnection};



