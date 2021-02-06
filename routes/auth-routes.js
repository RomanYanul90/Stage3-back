import { Router } from 'express';
import auth from '../middleware/auth-middleware';
import { userValidationParams, loginValidationParams } from '../middleware/validation-middleware';
import Controllers from '../controllers/UserControllers';

const router = Router();

router.post('/register', userValidationParams, Controllers.createUser);
router.post('/login', loginValidationParams, Controllers.loginUser);
router.get('/', auth, Controllers.getAllUsers);
router.get('/user/:id', auth, Controllers.getUserById);
router.get('/byUserName/:userName', auth, Controllers.getUserByUserName);
router.patch('/editUser/:id', auth, Controllers.editUser);
router.delete('/deleteUser/:id', auth, Controllers.deleteUser);

export default router;
