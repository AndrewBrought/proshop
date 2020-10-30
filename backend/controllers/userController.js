import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
        const {email, password} = req.body

        // check for user by email, if it exists it's put in the user variable
        const user = await User.findOne({email})

        // then we match the password, and pass the defined data back
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }

    })


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})


// @desc    Register a new user
// @route   POST /api/users
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    // check for user by email, if it exists it's put in the user variable
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        // user create is basically syntactic sugar for the .save method
        // we handle password encryption through middleware set up in our userModel
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
    //    For the password we first check to see if a password was sent
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {authUser, registerUser, getUserProfile, updateUserProfile}
