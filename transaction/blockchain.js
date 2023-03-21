const sha256 = require('./node_modules/js-sha256');
class blockchain{
     //  genesis block is the first block in the chain.
    //  -nilesh
    constructor(genesisBlock){
        this.blocks=[genesisBlock];
    }
    //  add a block to the chain -nilesh
    addBlock(block){
        if(this.blocks.length==0){
            block.previousHash = "0000000000000000";
            block.hash = this.generateHash(block);
        }
    }
    //with the help of js-sha256 we can generate the hash of the block -nilesh
    generateHash(block){
        const hash=sha256(block.key);
        console.log(hash)
    }
}