import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {validationResult} from "express-validator";
import config from '../config/default.json';
import {LoginUserService} from '../services/LoginUserServices';

export const LoginUser = async function (req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Invalid log in data."});
        }
        const {email, password} = req.body;

        const user = await LoginUserService(email);
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
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}