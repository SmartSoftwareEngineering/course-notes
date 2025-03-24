import User from "../models/User.js";
import { hashSync, compareSync } from "bcryptjs";

export const signUp = async(req,res,next) =>{

    const { name , email , password } = req.body;

    let existingUser;

    try{
      existingUser = await User.findOne({email})
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
      return res.status(201).json({ user })
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
      console.log(err);
    }
    if(!existingUser){
      return res.status(404).json({message : "User is not found"})
    }

    const isPasswordCorrect = compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
      return res.status(400).json({message: "Incorrect Password!"});
    }

    return res.status(200).json({user: existingUser});
}

export const getByID = async(req,res,next) =>{
    const id = req.params.id;
 
    let matchedUser;
 
    try{
      matchedUser = await User.findById(id, { password: 0})
    }catch(e){
      console.log(e);
      return res.status(400).json({message: "Could not find the user"})
    }


    if(!matchedUser){
      return res.status(400).json({message: "The user does not exist"});
    }
  
 
    try{
      return res.status(200).json(matchedUser)//((({ password: _ , ...o }) => o)(matchedUser._doc))
    }
    catch(e){
      console.log(e);
    }
}

export const updateByID = async(req,res,next) =>{
    const id = req.params.id;
    const { name , email , password } = req.body;
 
    const hashedPassword = hashSync(password);
    const updatedUser = {
      name,
      email,
      password: hashedPassword
    };

    try{
      await User.findByIdAndUpdate(id, updatedUser)
    }catch(e){
      console.log(e);
      return res.status(400).json({message: "Could not find/update the user"})
    }  
 
    try{
      return res.status(200).json({message: "User is successfully Updated"})
    }
    catch(e){
      console.log(e);
    }
}

export const deleteByID = async(req,res,next) =>{
    const id = req.params.id;

    try{
      await User.findByIdAndDelete(id)
    }catch(e){
      console.log(e);
      return res.status(400).json({message: "Could not find/delete the user"})
    }  
 
    try{
      return res.status(200).json({message: "User is successfully Deleted"})
    }
    catch(e){
      console.log(e);
    }
}