const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req,resp,next) => {
    try{
        const token = req.cookies.token;

        if(!token || token == undefined){
            return resp.status(400).json({
                success : false,
                message : "Token Missing"
            })
        }

        try{
            const payload = jwt.verify(token, process.env.secret_key);
            req.user = payload;
        }
        catch(err){
            resp.status(500).json({
                success : false,
                message : "Token Mismatch"
            })
        }

        next();
    }
    catch(err){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}