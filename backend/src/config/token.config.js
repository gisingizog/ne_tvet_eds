const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generate_Token = (id)=>{
    const token = jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    console.log("Token: " + token);
    return token;
};

module.exports = generate_Token;