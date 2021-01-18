import User from '../models/User';

export const GetAllUsersService = async () => {
    const users = await User.find()
    return users
}