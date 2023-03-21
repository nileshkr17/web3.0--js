class Block{
    constructor(){
        this.index = 0;
        this.previousHash = "";
        this.hash="";
        this.nonce = 0;
        this.transactions = [];
    }

    // each block will have a particular key that key will be based on the previous hash and the current hash
    get key(){
        return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
    }

    addTransaction(transaction){
          // particular account to a destination account -nilesh
        this.transactions.push(transaction);

    }
}
module.exports = Block;