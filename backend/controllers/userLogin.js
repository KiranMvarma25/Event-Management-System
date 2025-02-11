const usersSchema = require('../schema/usersSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userLogin = async(req,resp) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return resp.status(400).json({
                success : false,
                message : "Please fill all the Fields",
            })
        }

        const user = await usersSchema.findOne({email : email});
        if(!user){
            return resp.status(400).json({
                success : false,
                message : "Please Create an Account"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(isMatched){

            const payload = {
                email : user.email,
                id : user._id,
            }

            const options = {
                httpOnly : true,
                expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            }

            let token = jwt.sign(payload, process.env.SECRET_KEY);
            resp.cookie("token", token, options).status(200).json({
                success : true,
                message : "Logged In Successfully",
                Token : token,
                User : payload
            })
        }
        else{
            return resp.status(400).json({
                success : false,
                message : "Incorrect Password",
            })
        }

    }
    catch(err){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error",
        })
    }
}