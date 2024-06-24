# Project Management API with Task Scheduling
This Node.js and Express.js based RESTful API empowers users to effectively manage projects and associated tasks, with built-in scheduling capabilities. Streamline your project workflows and optimize task management with features designed to enhance organization and productivity.

## Table of Contents

* [Project Management API with Task Scheduling](#project-management-api-with-task-scheduling)
* [Key Features](#key-features)
* [Live App](#live-app)
* [Endpoints](#endpoint)
    * [Project Endpoints](#project-endpoints)
    * [Task Endpoints](#task-endpoints)

## Key Features
1. **Project Management**:
  - Create new projects with descriptive names and details.
  - Retrieve a list of all projects for comprehensive project oversight.
  - Access a specific project by its unique ID for focused management.
  - Update project information to reflect changes or revisions.
  - Delete projects when no longer necessary.
2. **Task Scheduling and Management**:
  - Add new tasks to a project, specifying titles, descriptions, start times, and end times in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ) for precise scheduling.
  - Retrieve a complete list of tasks within a project to visualize the overall workload.
  - Update existing tasks to adjust details, times, or completion status.
  - Delete tasks that are no longer relevant.
  - Mark tasks as completed to track progress and maintain a clear view of project status.
  - Filter tasks within a project to display only incomplete tasks, enabling focused attention on outstanding work.

## Live App
[project-management-production-069f.up.railway.app](https://project-management-production-069f.up.railway.app/)

## Endpoint
### Project Endpoints
1. **Creates a new project**
   ``` bash
    Endpoint: POST /projects
    Request body:
      * name (required): The name of the project. (String)
      * description (required): The description of the project. (String)
    Response:
      * Status code: 201 (Created) on success.
      * Response body: The newly created project object. (JSON)
2. **Retrieves a list of all projects**
   ```bash
    Endpoint: GET /projects
    Response:
      * Status code: 200 (OK) on success.
      * Response body: An array of project objects. (JSON)
3. **Retrieves a specific project by ID**
   ```bash
    Endpoint: GET /projects/:id
    Path parameter:
      * id: The ID of the project to retrieve. (String)
    Response:
      * Status code: 200 (OK) on success.
      * Response body: The project object with the specified ID. (JSON)

3. **Updates a specific project**
   ```bash
    Endpoint: PUT /projects/:id
    Path parameter:
      * id: The ID of the project to update. (String)
    Request body:
      * Any properties of the project object that you want to update. (JSON)
    Response:
      * Status code: 201 (Created) on success.
      * Response body: The updated project object. (JSON)

4. **Deletes a specific project**
   ```bash
    Endpoint: DELETE /projects/:id
    Path parameter:
      * id: The ID of the project to delete. (String)
    Response:
      * Status code: 200 (OK) on success.
      * Response body: A confirmation message. (JSON)

### Task Endpoints
1. **Creates a new task within a project**
   ```bash
    Endpoint: POST /projects/:projectId/tasks
    Path parameter:
      * projectId: The ID of the project to which the task belongs. (String)
    Request body:
      * title (required): The title of the task. (String)
      * description (required): The description of the task. (String)
      * startTime (required): The start time of the task in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ). (String)
      * endTime (required): The end time of the task in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ). (String)
    Response:
      * Status code: 201 (Created) on success.
      * Response body: The newly created task object. (JSON)
   
2. **Retrieves a list of all tasks within a project**
  ```bash
    Endpoint: GET /projects/:projectId/tasks
    Path parameter:
      * projectId: The ID of the project to retrieve tasks from. (String)
    Response:
      * Status code: 200 (OK) on success.
      * Response body: An array of task objects within the specified project. (JSON)
```

3. **Updates a specific task within a project**
  ```bash
    Endpoint: PUT /tasks/:id
    Path parameter:
      * id: The ID of the task to update. (String)
    Request Body:
      * title: The title of the task. (String)
      * description: The description of the task. (String)
      * startTime: The start time of the task in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ). (String)
      * endTime: The end time of the task in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ). (String)
      * completed (optional): A boolean flag indicating whether the task is completed (true) or not (false).
    Response:
      * Status code: 201 (Created) on success.
      * Response body: The updated task object. (JSON)
  ```

4. **Deletes a specific task within a project**
   ```bash
    Endpoint: DELETE /tasks/:id
    Path parameter:
      * id: The ID of the task to delete. (String)
    Response:
      * Status code: 200 (OK) on success.
      * Response body: A confirmation message. (JSON)

5. **Mark a task as complete**
    ```bash
    Endpoint: POST /projects/:projectId/tasks/:taskId/mark-completed
    Path parameters:
      * projectId: The ID of the project to which the task belongs. (String)
      * taskId: The ID of the task to mark as completed. (String)
    Response:
      * Status code: 201 (Created) on success.
      * Response body: A confirmation message indicating the task is now marked as completed. (JSON)

6. **Retrieves a list of all incomplete tasks within a project**
    ```bash
    Endpoint: GET /projects/:projectId/tasks/incomplete
    Path parameter:
      * projectId: The ID of the project to retrieve incomplete tasks from. (String)
    Response:
      * Status code: 200 (OK) on success.
      * Response body: An array of task objects within the specified project that are marked as incomplete (where `completed` is false). (JSON)

   
