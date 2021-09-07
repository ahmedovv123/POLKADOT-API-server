const apiConnection = require("../../nodeConnection");

const connectApi = apiConnection.getNodeConnection().then((api) => {
    return api;
});
  
exports.getLastBlock = (req, res) => {

    connectApi.then((api) => {
    api.rpc.chain
      .getBlock()
      .then((data) => {
        res.send(data.toHuman());
      })
      .catch((err) => {
        res.status(500).send({
        message: err.message || "Some error occured",
        });
      });
    });
}

exports.getBlockHashByNumber = (req, res) => {

    const number = req.params.num;
    connectApi.then((api) => {
      api.rpc.chain
        .getBlockHash(number)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occured",
          });
        });
    });
}

exports.getBlockByHash = (req, res) => {

    const hash = req.body.hash;
    connectApi.then((api) => {
      api.rpc.chain
        .getBlock(hash)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occured",
          });
        });
    });
}

exports.getXBlocksAfterN = (req,res) => {
    connectApi.then((api) => {
        const X = parseInt(req.params.x);
        const N = req.params.n;
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
                res.send(blocks);
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Some error occured",
              });
            });
    
          i++;
        }
    });
}

exports.getAddressBalance = (req,res) => {
  const address = req.params.adr
  connectApi.then(api => {

    api.query.system.account(address)
      .then(data => {
      res.send(data.toHuman())
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occured"
          });
      });
  })
}