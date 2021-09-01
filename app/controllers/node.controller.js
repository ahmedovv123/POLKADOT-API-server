
const api = require('../../nodeConnection');


const connect = api.getNodeConnection().then(api => {
    return api;
});


// Get last synchronised block 
exports.getBlock =  (req, res) => {
    
    connect.then(api => {

        
        api.rpc.chain.getBlock()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });
    })
};


// Get hash of block by Number
exports.getBlockByNumber = (req, res) => {
    const number = req.params.num

    connect.then(api => {
        
        api.rpc.chain.getBlockHash(number)
        .then(data => {
            res.send(data);
           
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });
    })

};

// Get Block block by hash

exports.getBlockByHash = (req, res) => {
    const hash = req.body.hash

    connect.then(api => {
        
        api.rpc.chain.getBlock(hash)
        .then(data => {
            
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });
    })
 

};


exports.getXblocksAfterN = (req, res) => {

    connect.then(api => {

        const X = parseInt(req.params.x);
        const N = req.params.n;
        let i = 1;
        let blocks = [];
        let completed = 0;

        while (i <= X) {
            
            api.rpc.chain.getBlockHash(N-i)
            .then(data => {
                completed++;
                blocks.push(data)
                if(completed == X) {
                    res.send(blocks);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured"
                });
            });

            i++;
        }
    })
    
 
}


exports.getTransactionsFromBlockByHash = async (req, res) => {
    const hash = req.body.hash

    connect.then(api =>  {
        
        async function getBlock() {
            // no blockHash is specified, so we retrieve the latest
            const signedBlock = await api.rpc.chain.getBlock();
            var blocks = [];
            // the information for each of the contained extrinsics
            signedBlock.block.extrinsics.forEach((ex, index) => {
            // the extrinsics are decoded by the API, human-like view
            

             const { isSigned } = ex;
            
                if(isSigned){
                    

                    blocks.push(ex.toHuman());
                    console.log(index, ex.toHuman());

                }


            });   
            res.send(blocks);            
        }
        
        getBlock();
        

    })
}

