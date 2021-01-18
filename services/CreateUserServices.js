import User from '../models/User';
import bcrypt from 'bcryptjs';

export const CreateUserService = async function (firstName, lastName, userName, email, phone, password) {
    const isUserNameExist = await User.findOne({userName});
    const isUserEmailExist = await User.findOne({email});

    if (!isUserEmailExist || !isUserNameExist) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({firstName, lastName, userName, email, phone, password: hashedPassword});
        await user.save()

    }else {
        throw new Error
    }

}