import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next) {
    // .isModified is part of mongoose to check to see if something's been modified or not
    if(!this.isModified('password')) {
        //this means if the password field has not been added or sent, then we call next and move on
        next()
    }

    // if it has been modified then this will run and hash the password
    const salt = await bcrypt.genSalt(10)
    // initially this.password is the plain text password, but now we're resetting it to be hashed
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema);

export default User;
