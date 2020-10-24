import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

// This is in no way connected to our server, it's completely separate for dev purposes

dotenv.config();

connectDB();

const importData = async () => {
    try {
    //    first thing we do is clear all three collections completely - because we don't want
    //    to import anything with stuff already in the db
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //This returns an array of users which will allow us to select the user with role admin
        const createdUsers = await User.insertMany(users);

        // Remember this is just hardcoded data to work with as we build, so, we know what index our
        // Admin is so we can just call it
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            //This is returning all the products AND the adminUser to allow us to tie admin to this collection
            return {...product, user: adminUser}
        })

        // This sets our product model to all the sample products with a targeted admin
        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        // we add one to tell the program to exit with failure
        process.exit(1);
    }
}


const destroyData = async () => {
    try {
        //    first thing we do is clear all three collections completely - because we don't want
        //    to import anything with stuff already in the db
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();


        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        // we add one to tell the program to exit with failure
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
