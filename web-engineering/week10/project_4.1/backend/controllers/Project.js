import Project from "../models/Project.js";

export const create = async(req,res,next) =>{

    const { name , description } = req.body;
    const project = new Project({
      name,
      description
    });

    try{
      project.save();
      return res.status(201).json({ project: project })
    }
    catch(e){
      console.log(e);
      return res.status(500).json({ message: "The project was successfully created. Please try again" })
    }
}

export const getAll = async(req,res,next) => {

    let allProjects = [];

    try{
      allProjects = await Project.find();
      return res.status(200).json({projects: allProjects});
    }catch(e){
      console.log(err);
      return res.status(500).json({message: "We were not able to fetch the projects"});
    }

    
}

export const getByID = async(req,res,next) =>{
    const id = req.params.id;
 
    let matchedProject;
 
    try{
        matchedProject = await Project.findById(id)
    }catch(e){
      console.log(e);
      return res.status(500).json({message: "Could not find the project"})
    }


    if(!matchedProject){
      return res.status(400).json({message: "The project does not exist"});
    }
  
 
    try{
      return res.status(200).json(matchedProject)
    }
    catch(e){
      console.log(e);
    }
}

export const updateByID = async(req,res,next) =>{
    const id = req.params.id;
    const { name , description } = req.body;

    const updatedProject = {
      name,
      description
    };

    try{
      await Project.findByIdAndUpdate(id, updatedProject)
    }catch(e){
      console.log(e);
      return res.status(400).json({message: "Could not find/update the project"})
    }  
 
    try{
      return res.status(200).json({message: "Project is successfully Updated"})
    }
    catch(e){
      console.log(e);
    }
}

export const deleteByID = async(req,res,next) =>{
    const id = req.params.id;

    try{
      await Project.findByIdAndDelete(id)
    }catch(e){
      console.log(e);
      return res.status(400).json({message: "Could not find/delete the project"})
    }  
 
    try{
      return res.status(200).json({message: "Project is successfully Deleted"})
    }
    catch(e){
      console.log(e);
    }
}