import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
//    This is where we define all the fields that we want for a user
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
//    With Mongoose we can pass in a second argument of options - passing timestamp
//    this way will allow us to have created-at and updated-at fields automatically
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;
