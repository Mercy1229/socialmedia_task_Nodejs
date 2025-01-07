import express from 'express'
import { getsingleUser, getUser, loginUser, postUser } from '../controllers/user.js';

const router = express.Router();

router.post('/post/user', postUser)
router.get('/get/users', getUser)
router.get('/get/user/:id', getsingleUser)
router.post('/post/login', loginUser)

export default router;
