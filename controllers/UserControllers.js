import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/default.json';
import Services from '../services/UserServices';

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Invalid user register data.' });
    }

    const {
      firstName, lastName, userName, email, phone, password,
    } = req.body;

    try {
      await Services.createUser(firstName, lastName, userName, email, phone, password);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'User with the same name or email already exist.' });
    }

    res.status(201).json({ message: 'User created' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Invalid log in data.' });
    }
    const { email, password } = req.body;

    const user = await Services.loginUser(email);
    if (!user) {
      return res.status(400).json({ message: 'User dose not exist.' });
    }

    const isPasswordsMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatch) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { userId: user.id },
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Services.getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Services.getUserById(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getUserByUserName = async (req, res) => {
  const { userName } = req.params;
  try {
    const user = await Services.getUserByUserName(userName);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await Services.editUser(id, updates);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Services.deleteUser(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByUserName,
  editUser,
  deleteUser,
};
