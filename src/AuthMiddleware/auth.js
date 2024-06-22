const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifytoken=(req,res,next)=>{
    const token=extracttoken(req)
    if(!token){
        throw new Error("no valid token")
    }
    try{
       const decoded=jwt.verify(token,process.env.MY_SECRET_KEY);
       console.log(decoded)
       req['user']=decoded;
       next();
    }
    catch(err){
        throw new Error(err)
    }
}

function extracttoken(req){
    const authtoken=req.headers['authorization'];
    if(typeof authtoken!==undefined){
        const [type,token]=authtoken.split(' ')
        console.log(token)
        if(type==='Bearer' && token){
            return token;
        }
    }
    return undefined;
}

module.exports={verifytoken}