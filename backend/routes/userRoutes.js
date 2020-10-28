import express from 'express';
const router = express.Router();
import { authUser, registerUser,getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser)
router.post('/login', authUser)
// we implement middleware by putting it as a first argument - so this protect middleware will run when
// we hit this route
router.route('/profile').get(protect, getUserProfile)


export default router;
