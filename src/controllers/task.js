import { getProjectById, getProjectByIdUpdate } from "../model/project.js";
import { Project } from "../model/project.js";

const addTask = async (req, res) => {
    try {
      // extract project id and task details from request body and parameters
        const { projectId } = req.params;
        const { title, description, startTime, endTime } = req.body;
        // validate required task data
        if (!title || !description || !startTime || !endTime) {
          return res.status(400).json({ message: "Missing required title / description / startTime / endTime information" });
        };
        // convert string timestamps to Date objects for comparison
        const checkIn = new Date(startTime);
        const checkout = new Date(endTime);
        // validate that start time is before end time
        if (checkIn >= checkout) {
            return res.status(400).json({ message: "startTime must be earlier than endTime" });
        };
        // find the project by project id
        const project = await Project.findById(projectId);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        };
        // check for task conflicts with existing tasks
        const hasConflict = project.tasks.some(task => {
          const existingStart = new Date(task.startTime);
          const existingEnd = new Date(task.endTime);
          return (checkIn < existingEnd && checkout > existingStart);
        });
        if (hasConflict) {
          return res.status(400).json({ message: "Task conflicts with existing tasks in this project" });
        };
        // update the project with the new task using $push operator
        const task = await getProjectByIdUpdate(projectId, {
            $push: { tasks: {title: title, description: description, startTime: checkIn, endTime: checkout, completed: false }}},
            { new: true }
        );
        // retrieve the complete updated project document
        const updatedProject = await getProjectById(projectId);
        // respond with the new updated project (status code 201 for success updating project's task)
        res.status(201).json(updatedProject.tasks[updatedProject.tasks.length - 1]);
    } catch (error) {
        // log error to console for degugging purposes
        console.error(`Failed on controller add new task to project: ${error.message}`);
        res.status(500).json({message: "Internal server error"})
    }
};

const getAllTasks = async (req, res) => {
    try {
      // extract project id from request parameters
      const { projectId } = req.params;
      // get a project by provided project id
      const project = await getProjectById(projectId);
      // check if the project not found (might be null/undefined due to invalid project id)
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      // respond with the selected project (status code 200 for success updating project's task)
      res.status(200).send(project.tasks);
    } catch (error) {
      // log error to console for degugging purposes
      console.error(`Failed on controller get all task from a project: ${error.message}`);
      res.status(500).json({message: "Internal server error"})
    }
};

const updateProjectTask = async (req,res) => {
    try {
      // extract project id and task details from request body and parameters
      const { id } = req.params;
      const { title, description, startTime, endTime } = req.body;
      // validate required task data
      if (!title || !description || !startTime || !endTime) {
        return res.status(400).json({ message: "Missing required title / description / startTime / endTime information" });
      };
      // convert string timestamps to Date objects
      const checkIn = new Date(startTime);
      const checkout = new Date(endTime);
      // Update the specific task within the project by referencing task id
      const updatedTask = await Project.findOneAndUpdate(
          { "tasks._id": id },
          {
            $set: {
              "tasks.$": {
                _id: id,
                title,
                description,
                startTime: checkIn,
                endTime: checkout
              },
            },
          },
          { new: true }
        );
      // respond with the new updated project (status code 201 for success updating project's task)
      res.status(201).json(updatedTask.tasks.filter(task => task._id  == id));
    } catch (error) {
        // check if the project not found (might be null/undefined due to invalid project id)
        if (error.name === 'CastError') { 
          console.error(`Failed on model get project by _id (invalid id): ${error.message}`);
          return res.status(404).json({ message: "Task not found" });
        };
        // log error to console for degugging purposes
        console.error(`Failed on controller update task from a project: ${error.message}`);
        res.status(500).json({message: "Internal server error"})
    }
};
const deleteProjectTask = async (req, res) => {
    try {
      // extract project id from request parameters
      const { id } = req.params;
      // delete the project with the new task using $pull operator
      const task = await Project.findOneAndUpdate(
        { "tasks._id": id },
        { $pull: { tasks: { _id: id } } },
        { new: true }
      );
      // respond with confirmation message (status code 200 for success delete a project document)
      res.status(200).json({message: `Task ${id} has been deleted from server`});
    } catch (error) {
      // check if the project not found (might be null/undefined due to invalid project id)
      if (error.name === 'CastError') { 
        console.error(`Failed on model get project by _id (invalid id): ${error.message}`);
        return res.status(404).json({ message: "Task not found" });
      };
      // log error to console for degugging purposes
      console.error(`Failure on controller delete task by _id: ${error.message}`);
      res.status(500).json({message: "Internal server error"}) 
    }
  };

const markTaskAsCompleted = async (req, res) => {
  try {
    // extract project id and task id from request parameters
    const { projectId, taskId } = req.params;
    // find the project document by project id
    const project = await getProjectById(projectId);
    // check if the project not found (might be null/undefined due to invalid project id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // find the index of the task within the project's tasks array
    const taskIndex = project.tasks.findIndex(task => task._id.toString() === taskId);
    // check if the task not found (might be null/undefined due to invalid project id)
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    // update the completed status of the task at the specific index
    project.tasks[taskIndex].completed = true;
    // Save the updated project document to the database
    await project.save();
    // Respond with success (201 OK) and confirmation message
    res.status(201).json({ message: `Task ${taskId} has completed` });
  } catch (error) {
    // log error to console for degugging purposes
    console.error(`Failed on controller mark task as completed: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getIncompleteTasks = async (req, res) => {
  try {
    // extract project id from request parameters
    const { projectId } = req.params;
    // find the project document by ID
    const project = await getProjectById(projectId);
    // check if the project not found (might be null/undefined due to invalid project id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // filter the project's tasks to include only incomplete tasks (where completed is false)
    const incompleteTasks = project.tasks.filter(task => !task.completed);
    // respond with the filtered project (status code 200 for success filtering project's task)
    res.status(200).json(incompleteTasks);
  } catch (error) {
    // log error to console for degugging purposes
    console.error(`Failed on controller get incomplete tasks: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
    addTask,
    getAllTasks,
    updateProjectTask,
    deleteProjectTask,
    markTaskAsCompleted,
    getIncompleteTasks
};

