import {Request,Response,NextFunction} from 'express'
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import User from '../models/user'
import bcrypt from 'bcrypt'

// signup
interface signupData {
    email:String,
    password:String
}

export const signup = async (req:Request,res:Response,next:NextFunction) =>{
try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error:any = new Error('validation failed');
        error.data = errors.array();
        error.statusCode = 422;
        throw error;
    }
    const hash_password = bcrypt.hashSync(req.body.password,12)
    const userData:signupData ={
        email:req.body.email,
        password:hash_password

    }
    const user = new User(userData)
    const result:any = await user.save();
    if(result){
        const token = jwt.sign({userId:result.id},process.env.SECRET||'secret',{expiresIn:'1d'})
     res.status(201).json({
         Data:result,
         message:'success',
         status:1,
         access_token:token
     })
    }
    else{
        const error:any = new Error('User Register fail');
        error.statusCode = 422;
        throw error;
    }
} catch (error) {
    if(!error.statusCode){
        error.statusCode = 500;
    }
    next(error)
}
}

