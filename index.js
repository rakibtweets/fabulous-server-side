const express =require('express')
const { MongoClient, LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const cors=require('cors')
const app =express()

// port 
const port=process.env.PORT || 5000;


// middleware 
app.use(cors())
app.use(express.json())
// ocs.mongodb.com/drivers/node/current/usage-examples/insertOne 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jwphj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();

     
      
    
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/',(req ,res)=>{
    res.send("Running products Server")
})
app.listen(port, ()=>{
    console.log('runninf server on port',port)
})