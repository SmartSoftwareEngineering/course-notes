import User from "../models/User.js";
import { hashSync, compareSync } from "bcryptjs";

export const signUp = async(req,res,next) =>{

    const { name , email , password } = req.body;

    let existingUser;

    try{
      existingUser = await User.findOne({email}, {password: 0})
    }catch(e){
      console.log(err);
    }

    if(existingUser){
      return res.status(400).json({message : "User is already exists!"})
    }
    const hashedPassword = hashSync(password);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    try{
      user.save();
      return res.status(201).json({user: (({password:_, ...u}) => u)(user._doc)});
    }
    catch(e){
      console.log(e);
    }
}

export const logIn = async(req,res,next) => {
    const {email , password} = req.body;
     
    let existingUser;

    try{
      existingUser = await User.findOne({email})
    }catch(e){
      console.log(e);
    }
    if(!existingUser){
      return res.status(404).json({message : "User is not found"})
    }

    const isPasswordCorrect = compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
      return res.status(400).json({message: "Incorrect Password!"});
    }

    return res.status(200).json({user: (({password:_, ...user}) => user)(existingUser._doc)});
}