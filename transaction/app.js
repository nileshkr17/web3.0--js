const Block = require('./block')
const Blockchain = require('./blockchain');
let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

console.log(blockchain)