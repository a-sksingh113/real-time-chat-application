import {User} from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const {fullname,userName,password,confirmPassword,gender} = req.body;
       
        if(!fullname || !userName || !password || !confirmPassword || !gender){
            return res.status(400).json({messages:"all fields are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"password are not matching"});
        }
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({message:"userName already exists try different username"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const maleProfilePhoto = `api.multiavatar.com/kathrin.svg?userName=${userName}`
const femaleProfilePhoto = `api.multiavatar.com/zoe.svg?userName=${userName}`

await User.create({
    fullname:fullname,
    userName:userName,
    password:hashedPassword,
    confirmPassword:hashedPassword,
    profilePhoto:gender === "male"?maleProfilePhoto:femaleProfilePhoto,
    gender:gender,
});
return res.status(201).json({success:true,message:"account created succesfully"})


    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const {userName,password} = req.body;
        if(!userName || !password){
            return res.status(400).json({message:"all fields are required"});
        }
        const user = await User.findOne({userName});
        if(!user){
            return res.status(400).json({success:false,message:"invalid credentials"});
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({success:false,message:"password incorect try again"});
        }

        const tokenData = {
            userId:user._id
        };
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        return res.status(200).cookie("token",token,{maxAge:24*60*60*1000,httoOnly:true,sameSites:'strict'}).json({
         _id:user._id,
          fullname:user.fullname,
            userName:user.userName,
            profilePhoto:user.profilePhoto,
        })

    } catch (error) {
        console.log(error);
    }
};

export const logout = (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({message:"logged out successfully"});
    } catch (error) {
        console.log(error)
    }
};

export const getOtherUsers = async(req,res)=>{
    try {
        const loggedInUsersId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUsersId}}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
      console.log(error); 
    }
}