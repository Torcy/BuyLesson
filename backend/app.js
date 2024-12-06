const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb+srv://gm920:jKE9DzMmEIjz2Yqu@blesson.zogdj.mongodb.net/?retryWrites=true&w=majority&appName=BLesson';
let db;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect();
    db = client.db('blesson');
    console.log("Database connected successfully");
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectDB().then(() => {
  app.get('/product', async (req, res) => {
    try {
      const product = await db.collection('product').find({}).toArray();
      res.json(product);
    } catch (err) {
      console.error('Error retrieving products:', err);
      res.status(500).send('Error retrieving products');
    }
  });

  app.get('/print-products', async (req, res) => {
    try {
      const product = await db.collection('product').find({}).toArray();
      console.log(product);
      res.json(product);
    } catch (err) {
      console.error('Error printing products:', err);
      res.status(500).send('Error printing products');
    }
  });

  
  app.post('/order', async (req, res) => {
    try {
  
      const orderData = req.body;

      
      if (!orderData) {
        return res.status(400).send('Order data is required');
      }

      
      const result = await db.collection('order').insertOne(orderData);

      
      res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
      console.error('Error submitting order:', err);
      res.status(500).send('Error submitting order');
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});