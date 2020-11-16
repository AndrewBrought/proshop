import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';


import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();


connectDB();

const app = express();

// Set up middleware that will log when someone hits a route in our backend
//This is for it to run in dev mode only
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// This allows us to accept json data in the body
app.use(express.json());

// This means if we get a Get request to '/' then we want to run a function that takes in a req, res object
// and take the res object and call send - send to the client 'API is running'
app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Route to handle business paypal
app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

// This is how we make our upload folder static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//middleWare
app.use(notFound);

//middleWare
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode (Whoooaaa!) on port ${PORT}`.yellow.bold));
