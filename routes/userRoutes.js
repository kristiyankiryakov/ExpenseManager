import express from 'express'
const router = express.Router()
import usersController from '../controllers/usersController.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.route('/')
    .get(verifyJWT, usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser)
    .delete(verifyJWT, usersController.deleteUser)

export default router