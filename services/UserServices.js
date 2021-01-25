import User from "../models/User";
import bcrypt from "bcryptjs";

export const createUserService = async function (firstName, lastName, userName, email, phone, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({firstName, lastName, userName, email, phone, password: hashedPassword});
  await user.save();
};

export const loginUserService = async function (email) {
  return User.findOne({email});
};

export const getAllUsersService = async () => {
  return User.find();
};

export const getUserByIdService = async (id) => {
  return User.findById(id);
};

export const getUserByUserNameService = async (userName) => {
  return User.find({userName: userName});
};

export const editUserService = async (id, updates) => {
  return User.findByIdAndUpdate(id, updates);
};

export const deleteUserService = async (id) => {
  return User.findByIdAndDelete(id);
};
