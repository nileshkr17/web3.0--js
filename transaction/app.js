const express = require('express')
const Block = require('./block')
const BlockchainNode = require('./blockchainNode')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const fetch = require('node-fetch')

const app = express()
//const port = taking from console line and slicing it as the port is at position 2
const arguments = process.argv
let PORT = 1234
if(arguments.length > 2){
    PORT=arguments[2]
}

//taking the body of the request and converting it into json
app.use(express.json())
let transactions= []
let nodes=[]
let allTransactions = []

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

//  ROUTES

app.get('/resolve',(req,res)=>{
    nodes.forEach(node=>{
        fetch(`${node.url}/blockchain`)
        .then(response=>response.json())
        .then(otherBlockchain=>{
            if(otherBlockchain.blocks.length>blockchain.blocks.length){
                allTransactions.forEach(transaction=>{
                    fetch(`${node.url}/transactions`,{
                        method:'POST',
                        headers:{
                                'Content-Type':'application/json'
                            },
                        body:JSON.stringify(transaction)
                    }).then(response=>response.json())
                    .then(result=>{
                        fetch(`${node.url}/mine`)
                        .then(response=>response.json())
                        .then(result=>{
                            fetch(`${node.url}/blockchain`)
                            .then(response=>response.json())
                            .then(updatedBlockchain=>{
                                console.log(updatedBlockchain)
                                blockchain=updatedBlockchain
                                res.json(blockchain)
                            })
                        })
                    })
                })
            }else{
                res.json(blockchain)
            }
        })
    })
})

app.post('/nodes/register',(req,res)=>{

    const urls = req.body
    urls.forEach(url=>{
        const node = new BlockchainNode(url)
        nodes.push(node)
    })
    res.json(nodes)
})


//an array to store all the transactions -nilesh

//create a new transaction -nilesh
app.post('/transactions',(req,res)=>{
    const to =req.body.to
    const from = req.body.from
    const amount = req.body.amount

    //create a new transaction -nilesh
    let new_transaction = new Transaction(from,to,amount)
    transactions.push(new_transaction)
    res.json(transactions)
})

app.get('/mine',(req,res)=>{
    let block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    transactions.forEach(transactions=>{
        allTransactions.push(transactions)
    })
    transactions=[]
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

app.listen(PORT,()=>{
    console.log('Server is running on',PORT)
})

