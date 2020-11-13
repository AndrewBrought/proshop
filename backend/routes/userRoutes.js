import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
// we implement middleware by putting it as a first argument - so this protect middleware will run when
// we hit this route
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
// We can tack on .put() because it's involving the same route just a different action

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)


export default router;
