const {validationResult} = require("express-validator");
const CreateUserServices = require('../services/CreateUserServices');

exports.CreateUser = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Invalid user register data."})
        }

        const {firstName, lastName, userName, email, phone, password} = req.body

        try {
            await CreateUserServices.CreateUser(firstName, lastName, userName, email, phone, password)
        } catch (e) {
            return res.status(400).json({message:"User with the same name or email already exist."})
        }

        res.status(201).json({message: "User created"});

    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Something went wrong."});
    }
}