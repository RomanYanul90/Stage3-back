const User = require('../models/User');

exports.LoginUser = async function(email){
    const user = await User.findOne({email});
    return user;
}
