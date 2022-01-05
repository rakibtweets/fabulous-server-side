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
    const database = client.db('ProductsApi');
    const usersCollection = database.collection('users');
    const myOrdersCollection = database.collection('myBuyingWatch');

    const productsCollection = database.collection('products');

    // post
    app.post('/products', async (req, res) => {
      const service = req.body;
      console.log('hit the post api', service);
      const result = await productsCollection.insertOne(service);
      res.send(result);
    });
    //get
    app.get('/products', async (req, res) => {
      const cursor = productsCollection.find({});
      const servertest = await cursor.toArray();
      res.send(servertest);
    });

    //GET Watch details
    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.json(result);
    });

    // post user
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });
    // post user
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    // post blogs
    app.post('/blogs', async (req, res) => {
      const service = req.body;
      console.log('hit the post api', service);
      const result = await blogsCollection.insertOne(service);
      res.send(result);
    });

    //get blog
    app.get('/blogs', async (req, res) => {
      const cursor = blogsCollection.find({});
      const servertest = await cursor.toArray();
      res.send(servertest);
    });

    // update user to database

    app.put('/users', async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    //GET ai fot my order list
    app.get('/myBuyingList/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const cursor = myOrdersCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    //POST api for my buying list
    app.post('/myBuyingList/:email', async (req, res) => {
      const email = req.params.email;
      const myBookingInfo = req.body;
      const result = await myOrdersCollection.insertOne(myBookingInfo);
      res.json(result);
    });

    //manage All Orders api
    app.get('/manageAllOrders', async (req, res) => {
      const cusor = myBuyingWatchCollection.find({});
      const result = await cusor.toArray();
      res.send(result);
    });

    // DELETE MyBooking api
    app.delete('/deleteOrders/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await myBuyingWatchCollection.deleteOne(query);
      res.send(result);
    });

    //POST api for my buying list
    app.post('/myBuyingList/:email', async (req, res) => {
      const email = req.params.email;
      const myBookingInfo = req.body;
      const result = await myBuyingWatchCollection.insertOne(myBookingInfo);
      res.json(result);
    }); 

    //get admin
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let isAdmin = false;
      if (user?.role === 'admin') {
        isAdmin = true;
      }
      res.send({ admin: isAdmin });
    });

    // make an user admin

    app.put('/users/admin', async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const updateDoc = { $set: { role: 'admin' } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });
  } finally {
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
