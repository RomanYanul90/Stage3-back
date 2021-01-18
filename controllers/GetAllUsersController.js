import {GetAllUsersService} from '../services/GetAllUsersServices';

export const GetAllUsers = async (req, res) => {
    try {
        const users = await GetAllUsersService()
        res.json(users)
    } catch (e) {
        res.status(500).json({message: "Something went wrong."});
    }
}