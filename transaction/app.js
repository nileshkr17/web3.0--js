const express = require('express')
const Block = require('./block')
const BlockchainNode = require('./blockchainNode')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

const app = express()
//const port = taking from console line and slicing it as the port is at position 2
const arguments = process.argv
let PORT = 1234
if(arguments.length > 2){
    PORT=arguments[2]
}

//taking the body of the request and converting it into json
app.use(express.json())

let genesisBlock = new Block()
//let blockchain = new Blockchain(genesisBlock)






//an array to store all the transactions -nilesh
let transaction= []
let nodes=[]
//create a new transaction -nilesh
app.post('/transactions',(req,res)=>{
    const to =req.body.to
    const from = req.body.from
    const amount = req.body.amount

    //create a new transaction -nilesh
    let new_transaction = new Transaction(from,to,amount)
    transaction.push(new_transaction)
    res.json(transaction)
})

app.get('/mine',(req,res)=>{
    let block = blockchain.getNextBlock(transaction)
    blockchain.addBlock(block)
    res.json(block)
})

app.get('/blockchain',(req,res)=>{
    
    res.json(blockchain)
    // let transaction = new Transaction ('Nilesh','Saheel',100)
    // let genesisBlock = new Block()
    // let blockchain = new Blockchain(genesisBlock)
    // let block = blockchain.getNextBlock([transaction])
    // blockchain.addBlock(block)
    // let check_tran = new Transaction('Nilesh','Suman',500)
    // let block1 = blockchain.getNextBlock([check_tran])
    // blockchain.addBlock(block1)
    // res.json(blockchain)

})
app.post('/nodes/register',(req,res)=>{

    const urls = req.body
    urls.forEach(url=>{
        const node = new BlockchainNode(url)
        nodes.push(node)
    })
    res.send(nodes)
})

app.listen(PORT,()=>{
    console.log('Server is running on',PORT)
})

