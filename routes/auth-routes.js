import {Router} from 'express';
import {check} from 'express-validator';
import User from '../models/User';
import auth from '../middleware/auth-middleware';
import {CreateUser, LoginUser, GetAllUsers} from '../controllers/UserControllers'

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
    CreateUser)

router.post(
    '/login',
    [
        check('email', "Invalid email").normalizeEmail().isEmail(),
        check('password', "Invalid password").exists()
    ],
    LoginUser
)

router.get('/', auth, GetAllUsers)

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

router.patch('/editUser/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const updates = req.body
        const advert = await User.findByIdAndUpdate(id, updates)
        res.json(advert)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})

router.delete('/deleteUser/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const advert = await User.findByIdAndDelete(id)
        res.json(advert)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
})

module.exports = router