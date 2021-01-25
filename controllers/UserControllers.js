import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/default.json";
import {
  createUserService,
  loginUserService,
  getAllUsersService,
  getUserByIdService,
  getUserByUserNameService,
  editUserService,
  deleteUserService
} from "../services/UserServices";

export const createUser = async function (req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), message: "Invalid user register data."});
    }

    const {firstName, lastName, userName, email, phone, password} = req.body;

    try {
      await createUserService(firstName, lastName, userName, email, phone, password);
    } catch (e) {
      return res.status(400).json({message: "User with the same name or email already exist."});
    }

    res.status(201).json({message: "User created"});

  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const loginUser = async function (req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), message: "Invalid log in data."});
    }
    const {email, password} = req.body;

    const user = await loginUserService(email);
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
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};


export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUserByIdService(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const getUserByUserName = async (req, res) => {
  const userName = req.params.userName;
  try {
    const user = await getUserByUserNameService(userName);
    res.json(user);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const user = await editUserService(id, updates);
    res.json(user);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await deleteUserService(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({message: "Something went wrong."});
  }
};
