const usersSchema = require('../schema/usersSchema');
const bcrypt = require('bcrypt');

exports.userSignup = async (req, resp) => {
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return resp.status(400).json({
                success : false,
                message : "Please fill all the Fields"
            })
        }

        const isPresent = await usersSchema.findOne({email});
        if(isPresent){
            return resp.status(400).json({
                success : false,
                message : "User Already Exists"
            })
        }

        let hashPassword;
        try{
            hashPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            resp.status(400).json({
                success : false,
                message : "Error in Hashing the Password"
            })
        }

        const createdUser = await usersSchema.create({ name, email, password : hashPassword });
        resp.status(200).json({
            success : true,
            message : "User Created Successfully",
            siggnedUpUser : createdUser,
        })

    }
    catch(err){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error",
        })
    }
}