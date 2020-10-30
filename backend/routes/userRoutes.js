import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser)
router.post('/login', authUser)
// we implement middleware by putting it as a first argument - so this protect middleware will run when
// we hit this route
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
// We can tack on .put() because it's involving the same route just a different action


export default router;
