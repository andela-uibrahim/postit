import express from 'express';
import UserController from '../controllers/UserController';


const router = express.Router();


router.route('/')
    .get(UserController.getUsers);
router.route('/signup')
    .post(UserController.createUser);
router.route('/signin')
    .post(UserController.loginUser);

export default router;
