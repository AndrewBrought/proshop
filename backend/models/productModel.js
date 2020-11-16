import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user: {
        // This adds a relationship between the review and the user
        // It will allow us to know which Admin creates which product
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user: {
        // This adds a relationship between the product and the user
        // It will allow us to know which Admin creates which product
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
//    With Mongoose we can pass in a second argument of options - passing timestamp
//    this way will allow us to have created-at and updated-at fields automatically
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;
