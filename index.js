const express = require('express');
const { MongoClient, LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');
const app = express();

// port
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jwphj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
    try {
    // arif code here

    await client.connect();
    const database = client.db("ProductsApi");
    const productsCollection  = database.collection("products");

     // post
     app.post('/products',async(req,res)=>{
        
        const service=req.body
        console.log('hit the post api', service);
          const result=await productsCollection.insertOne(service)
        res.send(result)
      })
        //get
        app.get('/products',async(req,res)=>{
            const cursor = productsCollection.find({});
            const servertest=await cursor.toArray();
            res.send(servertest)
        })
  } 
  
  finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running products Server');
});
app.listen(port, () => {
  console.log('running server on port', port);
});
