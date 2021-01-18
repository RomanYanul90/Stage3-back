import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/default.json';
import {CreateUserService, LoginUserService, GetAllUsersService} from '../services/UserServices'

export const CreateUser = async function (req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Invalid user register data."});
        }

        const {firstName, lastName, userName, email, phone, password} = req.body;

        try {
            await CreateUserService(firstName, lastName, userName, email, phone, password)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "User with the same name or email already exist."});
        }

        res.status(201).json({message: "User created"});

    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}

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

export const GetAllUsers = async (req, res) => {
    try {
        const users = await GetAllUsersService()
        res.json(users)
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
}