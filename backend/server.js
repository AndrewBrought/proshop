import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';


import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

// This means if we get a Get request to '/' then we want to run a function that takes in a req, res object
// and take the res object and call send - send to the client 'API is running'
app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode (Whoooaaa!) on port ${PORT}`.yellow.bold));
