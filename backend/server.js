import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';


import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

// This allows us to accept json data in the body
app.use(express.json());

// This means if we get a Get request to '/' then we want to run a function that takes in a req, res object
// and take the res object and call send - send to the client 'API is running'
app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

//middleWare
app.use(notFound);

//middleWare
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode (Whoooaaa!) on port ${PORT}`.yellow.bold));
