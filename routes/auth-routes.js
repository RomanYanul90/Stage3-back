const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');

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
        check('phone', "Invalid phone input").isMobilePhone("any"),
        check('password', "Invalid password length").isLength({min: 8})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: "Invalid user register data."})
            }

            const {firstName, lastName, userName, email, phone, password} = req.body
            const isUserNameExist = await User.findOne({userName});
            const isUserEmailExist = await User.findOne({email});

            if (isUserEmailExist || isUserNameExist) {
                return res.status(400).json({message: "User with the same name or email already exist."});
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({firstName, lastName, userName, email, phone, password: hashedPassword});

            await user.save();
            res.status(201).json({message: "User created"});

        } catch (e) {
            res.status(500).json({message: "Something went wrong."});
        }
    })

router.post(
    '/login',
    [
        check('email', "Invalid email").normalizeEmail().isEmail(),
        check('password', "Invalid password").exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Invalid user register data."})
        }
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
})

module.exports = router