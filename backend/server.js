const express = require('express');
const products = require('./data/products');

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

app.listen(5000, console.log('Server running on port 5000'));
