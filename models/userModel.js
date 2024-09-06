import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
   confirmPassword:{
        type:String,
        required:true
    },
    
    profilePhoto:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    }
},{timestamps:true});
export const User = mongoose.model('User',userModel);