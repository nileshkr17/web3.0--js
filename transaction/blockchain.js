const sha256 = require('js-sha256');
const Block = require('./block.js');
class Blockchain{


     //  genesis block is the first block in the chain.
    //  -nilesh
    constructor(genesisBlock){
        this.blocks=[]
        this.addBlock(genesisBlock)
    }


    //  add a block to the chain -nilesh
    addBlock(block){
        if(this.blocks.length==0){
            block.previousHash = "0000000000000000";
            block.hash = this.generateHash(block);
        }
        this.blocks.push(block)
    }

    getNextBlock(transactions){
        let block = new Block()
        transactions.forEach((transactions)=>{
            block.addTransaction(transactions)
        })
        //prev block
        let previousBlock = this.getPreviousBlock()
        block.index = this.blocks.length
        block.previousHash = previousBlock.hash
        block.hash = this.generateHash(block)
        return block
    }

    getPreviousBlock(){
        return this.blocks[this.blocks.length - 1]
    }

    //with the help of js-sha256 we can generate the hash of the block -nilesh
    generateHash(block){
        let hash = sha256(block.key)
        while(!hash.startsWith('0000')){
            block.nonce +=1
            hash = sha256(block.key)
            console.log(hash)
        }
        return hash
    }
}

module.exports=Blockchain;