import {Router} from 'express';
import auth from '../middleware/auth-middleware';
import {userValidationParams, loginValidationParams} from '../middleware/validation-middleware';
import {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    getUserByUserName,
    editUser,
    deleteUser
} from '../controllers/UserControllers';

const router = Router();

router.post('/register', userValidationParams, createUser);
router.post('/login', loginValidationParams, loginUser);
router.get('/', auth, getAllUsers);
router.get('/user/:id', auth, getUserById);
router.get('/byUserName/:userName', auth, getUserByUserName);
router.patch('/editUser/:id', auth, editUser);
router.delete('/deleteUser/:id', auth, deleteUser);

export default router