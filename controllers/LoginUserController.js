const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const config = require('../config/default.json');
const LoginUserServices = require('../services/LoginUserServices');

exports.LoginUser = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Invalid log in data."})
        }
        const {email, password} = req.body;

        const user = await LoginUserServices.LoginUser(email);
        if (!user) {
            return res.status(400).json({message: "User dose not exist."});
        }

        const isPasswordsMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordsMatch) {
            return res.status(400).json({message: "Invalid password."});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.jwtSecret,
            {expiresIn: "1h"}
        );

        res.json({token, userId: user.id});

    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
}