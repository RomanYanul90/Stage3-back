import {Router} from 'express';
import {check} from 'express-validator';
import auth from '../middleware/auth-middleware';
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

router.post(
    '/register',
    [
        check('email', "Invalid email").isEmail(),
        check('firstName', "Invalid first name length.").isLength({min: 2, max: 20}),
        check('firstName', "First name field should contain only letters.").isAlpha(),
        check('lastName', "Invalid last name length.").isLength({min: 2, max: 20}),
        check('lastName', "Last name field should contain only letters.").isAlpha(),
        check('userName', "Invalid user name length.").isLength({min: 4, max: 20}),
        // check('phone', "Invalid phone input").isMobilePhone("any"),
        check('password', "Invalid password length").isLength({min: 8})
    ],
    CreateUser);

router.post(
    '/login',
    [
        check('email', "Invalid email").normalizeEmail().isEmail(),
        check('password', "Invalid password").exists()
    ],
    LoginUser
);

router.get('/', auth, GetAllUsers);

router.get('/user/:id', auth, GetUserById);

router.get('/byUserName/:userName', auth, GetUserByUserName);

router.patch('/editUser/:id', auth, EditUser);

router.delete('/deleteUser/:id', auth, DeleteUser);

module.exports = router