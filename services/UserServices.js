import bcrypt from 'bcryptjs';
import User from '../models/User';

const createUser = async (firstName, lastName, userName, email, phone, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName, lastName, userName, email, phone, password: hashedPassword,
  });
  await user.save();
};

const loginUser = async (email) => User.findOne({ email });

const getAllUsers = async () => User.find();

const getUserById = async (id) => User.findById(id);

const getUserByUserName = async (userName) => User.find({ userName });

const editUser = async (id, updates) => User.findByIdAndUpdate(id, updates);

const deleteUser = async (id) => User.findByIdAndDelete(id);

export default {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByUserName,
  editUser,
  deleteUser,
};
