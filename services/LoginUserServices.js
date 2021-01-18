import User from '../models/User';

export const LoginUserService = async function(email){
    const user = await User.findOne({email});
    return user;
}
