const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

let transaction = new Transaction ('Nilesh','Singh',100)

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)
let block = blockchain.getNextBlock([transaction])
blockchain.addBlock(block)

let check_tran = new Transaction('Nilesh','Suman',500)
let block1 = blockchain.getNextBlock([check_tran])
blockchain.addBlock(block1)


console.log(blockchain)