import {User} from '../models/userModel.js';
import bcrypt from 'bcryptjs';

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
        
    } catch (error) {
        console.log(error);
    }
}