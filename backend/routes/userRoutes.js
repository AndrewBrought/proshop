import express from 'express';
const router = express.Router();
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser)
// we implement middleware by putting it as a first argument - so this protect middleware will run when
// we hit this route
router.route('/profile').get(protect, getUserProfile)

export default router;
