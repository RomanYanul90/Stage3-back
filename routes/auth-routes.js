const {Router} = require('express');
const {check} = require('express-validator');
const User = require('../models/User');
const CreateUserController = require('../controllers/CreateUserController');
const LoginUserController = require('../controllers/LoginUserController')
const auth = require('../middleware/auth-middleware');

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
    CreateUserController.CreateUser)

router.post(
    '/login',
    [
        check('email', "Invalid email").normalizeEmail().isEmail(),
        check('password', "Invalid password").exists()
    ],
    LoginUserController.LoginUser
)

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
})

router.get('/user/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
})

router.get('/byUserName/:userName', auth, async (req, res) => {
    try {
        const adverts = await User.find({userName: req.params.userName})
        res.json(adverts)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})


module.exports = router