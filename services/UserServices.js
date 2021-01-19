import User from '../models/User';
import bcrypt from 'bcryptjs';

export const createUserService = async function (firstName, lastName, userName, email, phone, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({firstName, lastName, userName, email, phone, password: hashedPassword});
    await user.save()
};

export const loginUserService = async function (email) {
    return await User.findOne({email});
};

export const getAllUsersService = async () => {
    return await User.find();
};

export const getUserByIdService = async (id) => {
    return await User.findById(id);
};

export const getUserByUserNameService = async (userName) => {
    return await User.find({userName: userName});
};

export const editUserService = async (id, updates) => {
    return await User.findByIdAndUpdate(id, updates);
};

export const deleteUserService = async (id) => {
    return await User.findByIdAndDelete(id);
};
