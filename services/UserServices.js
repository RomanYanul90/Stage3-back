import bcrypt from 'bcryptjs';
import User from '../models/User';

export const createUserService = async (firstName, lastName, userName, email, phone, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName, lastName, userName, email, phone, password: hashedPassword,
  });
  await user.save();
};

export const loginUserService = async (email) => User.findOne({ email });

export const getAllUsersService = async () => User.find();

export const getUserByIdService = async (id) => User.findById(id);

export const getUserByUserNameService = async (userName) => User.find({ userName });

export const editUserService = async (id, updates) => User.findByIdAndUpdate(id, updates);

export const deleteUserService = async (id) => User.findByIdAndDelete(id);
