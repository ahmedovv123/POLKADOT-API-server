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

exports.getAddress = (req, res) => {
  //TODO: get balance and transactions of address
};



