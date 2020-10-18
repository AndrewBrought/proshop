import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

dotenv.config();

connectDB();

const app = express();

// This means if we get a Get request to '/' then we want to run a function that takes in a req, res object
// and take the res object and call send - send to the client 'API is running'
app.get('/', (req, res) => {
    res.send('API is running...')
})

//This gives us a json array with all the products
app.get('/api/products', (req, res) => {
    res.json(products);
})

//this gives us a single product by it's id
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product);
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode (Doooode, totally) on port ${PORT}`));
