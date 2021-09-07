const rpcService = require("../services/RPC-services");
const dbService = require("../services/DB-services");

// Get last synchronised block
exports.getBlock = (req, res) => {
  rpcService.getLastBlock(req,res);
};

// Get hash of block by Number
exports.getBlockByNumber = (req, res) => {
  rpcService.getBlockHashByNumber(req,res);
};

// Get block by hash
exports.getBlockByHash = (req, res) => {
  rpcService.getBlockByHash(req,res);
};
// Get X block after N-th, new to old
exports.getXblocksAfterN = (req, res) => {
  rpcService.getXBlocksAfterN(req,res);
};

// Get Address balance
exports.getAddressBalance = (req, res) => {
  rpcService.getAddressBalance(req, res);
};

// Get Address transactions
exports.getAddressTransactions = (req, res) => {
  dbService.getAddressTransactions(req, res);
};

// Get block transactions
exports.getBlockTransactions = (req, res) => {
  dbService.getBlockTransactions(req, res);
};

exports.getTransactionByHash = (req, res) => {
  dbService.getTransactionByHash(req, res);
}


