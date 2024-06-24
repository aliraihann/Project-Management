import { createProject, getProjectList, getProjectById, getProjectByIdUpdate, deleteProjectById } from "../model/project.js";

const newProject = async (req, res) => {
    try {
        // extract and validate required project information from request body
        const { name , description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Missing required name / description information" });
        };
        // create a new project document
        const project = await createProject(name, description);
        // respond with the new created project (status code 201 for success creation of project document)
        res.status(201).json({
            name: project.name,
            description: project.description,
            id: project['_id'],
            task: project.tasks
        });
    } catch (error) {
        // log error to console for degugging purposes
        console.error(`Failed on controller create new project: ${error.message}`);
        res.status(500).json({message: "Internal server error"})
    }
};

const projectList = async (req, res) => {
    try {
        // get a list of all the project documents
        const list = await getProjectList();
        // transform each project into an object with desired fields
        const projectData = list.map(project => ({
            name: project.name,
            description: project.description,
            id: project['_id'],
            task: project.tasks
        }));
        // respond with the list of projects (status code 200 for success)
        res.status(200).json(projectData);
    } catch (error) {
        // log error to console for degugging purposes
        console.error(`Failed on controller get project list: ${error.message}`);
        res.status(500).json({message: "Internal server error"})
    }
};

const projectById = async (req, res) => {
    try {
        // extract project id request parameters
        const { id } = req.params;
        const project = await getProjectById(id);
        // check if the project not found (might be null/undefined due to invalid project id)
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
          }
        // respond with the selected project (status code 200 for success)
        res.status(200).json({
            name: project.name,
            description: project.description,
            id: project['_id'],
            task: project.tasks
        });
    } catch (error) {
        // log error to console for degugging purposes
        console.error(`Failed on controller get project by _id: ${error.message}`);
        res.status(500).json({message: "Internal server error"})
    }
};

const projectUpdate = async (req, res) => {
    try {
        // extract project id request parameters
        const { id } = req.params;
        // create an update data object to accumulate changes for project update
        const updateData = {};
        // check if request body includes a name property
        if (req.body.name) {
          updateData.name = req.body.name;
        };
        // check if request body includes a description property
        if (req.body.description) {
          updateData.description = req.body.description;
        };
        const update = await getProjectByIdUpdate(id, updateData)
        // check if the project not found (might be null/undefined due to invalid project id)
        if (!update) {
            return res.status(404).json({ message: "Project not found" });
        };
        // get the project with an updated information
        const updatedProject = await getProjectById(id);
        // respond with the new updated project (status code 201 for success updating a project document)
        res.status(201).json({
            name: updatedProject.name,
            description: updatedProject.description,
            id: updatedProject['_id'],
            task: updatedProject.tasks
        });
    } catch (error) {
        // log error to console for degugging purposes
        console.error(`Failed on controller update project by _id: ${error.message}`);
        res.status(500).json({message: "Internal server error"})
    }
};

const deleteProject = async (req, res) => {
    try {
        // extract project id request parameters
        const { id } = req.params;
        const deletedProject = await deleteProjectById(id);
        // check if the project not found (might be null/undefined due to invalid project id)
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
          }
        // respond with confirmation message (status code 200 for success delete a project document)
        res.status(200).json({message: `Project ${id} has been deleted from server`});
    } catch (error) {
        // log error to console for degugging purposes
        console.error(`Failure on controller delete project by _id: ${error.message}`);
        res.status(500).json({message: "Internal server error"}) 
    }
};

export {
    newProject,
    projectList,
    projectById,
    projectUpdate,
    deleteProject
};