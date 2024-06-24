import mongoose from "mongoose";
import projectSchema from "../schema/project.js";

const Project =  mongoose.model('project', projectSchema);

const createProject = async (name, desc) => {
    try {
        // create a new project document with provided name and description
        const newProject =  await Project.create({name: name, description: desc});
        return newProject
    } catch (error) {
        // log error to console for degugging purposes
        console.error(`Failed on model create new project: ${error.message}`);
        throw error;
    }
};

const getProjectList = async () => {
    try {
        // find all the project document from database
        const projectList = await Project.find({});
        return projectList;
    } catch (error) {
        // log error to console for degugging purposes
        console.error(`Failed on model get project list: ${error.message}`);
        throw error;
    }
};

const getProjectById = async (id) => {
    try {
        // find a project by the provided project id
        const selectedProject = await Project.findById(id);
        return selectedProject;
    } catch (error) {
        // check for CastError related to ObjectId (if the input is incorrect project id)
        if (error.name === 'CastError') {
            console.error(`Failed on model get project by _id (invalid id): ${error.message}`);
            return null
        };
        // log error to console for degugging purposes
        console.error(`Failed on model get project by _id: ${error.message}`);
        throw error;
    }
};

const getProjectByIdUpdate = async (id, update) => {
    try {
        // find a project by the provided project id and update the selected project by the provided update data
        const selectedProject = await Project.findByIdAndUpdate(id, update);
        return selectedProject;
    } catch (error) {
        // check for CastError related to ObjectId (if the input is incorrect project id)
        if (error.name === 'CastError') { 
            console.error(`Failed on model get project by _id (invalid id): ${error.message}`);
            return null
        };
        // log error to console for degugging purposes
        console.error(`Failed on model update project by _id: ${error.message}`);
        throw error;
    }
};

const deleteProjectById = async (id) => {
    try {
        // find a project by the provided project id and delete the selected project
        const selectedProject = await Project.findByIdAndDelete(id);
        return selectedProject;
    } catch (error) {
        // check for CastError related to ObjectId (if the input is incorrect project id)
        if (error.name === 'CastError') { 
            console.error(`Failed on model get project by _id (invalid id): ${error.message}`);
            return null
        };
        // log error to console for degugging purposes
        console.error(`Failed on model delete project by _id: ${error.message}`);
        throw error;
    }
};

export {
    createProject,
    getProjectList,
    getProjectById,
    getProjectByIdUpdate,
    deleteProjectById,
    Project
};