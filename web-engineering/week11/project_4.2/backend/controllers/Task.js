import Task from "../models/Task.js";

export const create = async(req,res,next) =>{

    const { summary , description , status } = req.body;
    const task = new Task({
      summary,
      description,
      status
    });

    try{
      task.save();
      return res.status(201).json({ task: task })
    }
    catch(e){
      console.log(e);
      return res.status(500).json({ message: "The task was successfully created. Please try again" })
    }
}

export const getAll = async(req,res,next) => {

    let allTasks = [];

    try{
      allTasks = await Task.find();
      return res.status(200).json({tasks: allTasks});
    }catch(e){
      console.log(err);
      return res.status(500).json({message: "We were not able to fetch the tasks"});
    }

    
}

export const getByID = async(req,res,next) =>{
    const id = req.params.id;
 
    let matchedTask;
 
    try{
        matchedTask = await Task.findById(id)
    }catch(e){
      console.log(e);
      return res.status(500).json({message: "Could not find the task"})
    }


    if(!matchedTask){
      return res.status(400).json({message: "The task does not exist"});
    }
  
 
    try{
      return res.status(200).json(matchedTask)
    }
    catch(e){
      console.log(e);
    }
}

export const updateByID = async(req,res,next) =>{
    const id = req.params.id;
    const { summary , description , status } = req.body;

    const updatedTask = {
      summary,
      description,
      status
    };

    try{
      await Task.findByIdAndUpdate(id, updatedTask)
    }catch(e){
      console.log(e);
      return res.status(400).json({message: "Could not find/update the task"})
    }  
 
    try{
      return res.status(200).json({message: "Task is successfully Updated"})
    }
    catch(e){
      console.log(e);
    }
}

export const deleteByID = async(req,res,next) =>{
    const id = req.params.id;

    try{
      await Task.findByIdAndDelete(id)
    }catch(e){
      console.log(e);
      return res.status(400).json({message: "Could not find/delete the task"})
    }  
 
    try{
      return res.status(200).json({message: "Task is successfully Deleted"})
    }
    catch(e){
      console.log(e);
    }
}