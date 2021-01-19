import {Router} from 'express';
import auth from '../middleware/auth-middleware';
import {userValidationParams, loginValidationParams} from '../middleware/validation-middleware';
import {
    CreateUser,
    LoginUser,
    GetAllUsers,
    GetUserById,
    GetUserByUserName,
    EditUser,
    DeleteUser
} from '../controllers/UserControllers';

const router = Router();

router.post('/register', userValidationParams, CreateUser);
router.post('/login', loginValidationParams, LoginUser);
router.get('/', auth, GetAllUsers);
router.get('/user/:id', auth, GetUserById);
router.get('/byUserName/:userName', auth, GetUserByUserName);
router.patch('/editUser/:id', auth, EditUser);
router.delete('/deleteUser/:id', auth, DeleteUser);

export default router