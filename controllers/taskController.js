const asyncHandler = require("express-async-handler");
const taskService = require("../services/taskService");


// Get all tasks for the authenticated user --------------------------------------------------------------
const getAllTasks = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    const error = new Error("User ID is required");
    error.statusCode = 400; 
    throw error; 
  }

  const tasks = await taskService.getAllTasks(userId);

  if (tasks.length === 0) {
    res.status(200).json({ message: "You have no tasks. Start by creating one!" });
  } else {
    res.status(200).json(tasks);
  }
});


// Get a single task by ID for the authenticated user --------------------------------------------------------------
const getTaskById = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const task = await taskService.getTaskById(req.params.id, userId);

  if (!task) {
    const error = new Error("Internal Server Error");
    error.statusCode = 500; 
    throw error; 
  }

  res.status(200).json(task);
});


// Create a new task for the authenticated user --------------------------------------------------------------
const createTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const taskData = { ...req.body, user: userId };
  const newTask = await taskService.createTask(taskData);
  res.status(201).json(newTask);
});


// Update a task (PUT) for the authenticated user --------------------------------------------------------------
const updateTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const updatedTask = await taskService.updateTask(req.params.id, req.body, userId);

  if (!updatedTask) {
    const error = new Error("Internal Server Error");
    error.statusCode = 500; 
    throw error; 
  }

  res.status(200).json(updatedTask);
});


// Partially update a task (PATCH) for the authenticated user --------------------------------------------------------------
const patchTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const updatedTask = await taskService.patchTask(req.params.id, req.body, userId);

  if (!updatedTask) {
    const error = new Error("Internal Server Error");
    error.statusCode = 500; 
    throw error; 
  }

  res.status(200).json(updatedTask);
});


// Delete a task for the authenticated user --------------------------------------------------------------
const deleteTask = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const deletedTask = await taskService.deleteTask(req.params.id, userId);

  if (!deletedTask) {
    const error = new Error("Internal Server Error");
    error.statusCode = 500; 
    throw error; 
  }

  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
};




































// const asyncHandler = require("express-async-handler");
// const taskService = require("../services/taskService");

// // Get all tasks for the authenticated user
// const getAllTasks = asyncHandler(async (req, res) => {
//   const userId = req.user.userId;
//   const tasks = await taskService.getAllTasks(userId);
//   res.status(200).json(tasks);
// });

// // Get a single task by ID for the authenticated user
// const getTaskById = asyncHandler(async (req, res) => {
//   const userId = req.user.userId;
//   const task = await taskService.getTaskById(req.params.id, userId);
//   if (!task) {
//     res.status(500);
//     throw new Error("Internal Server Error");
//   }
//   res.status(200).json(task);
// });

// // Create a new task for the authenticated user
// const createTask = asyncHandler(async (req, res) => {
//   const userId = req.user.userId;
//   const taskData = { ...req.body, user: userId };
//   const newTask = await taskService.createTask(taskData);
//   res.status(201).json(newTask);
// });

// // Update a task (PUT) for the authenticated user
// const updateTask = asyncHandler(async (req, res) => {
//   const userId = req.user.userId;
//   const updatedTask = await taskService.updateTask(req.params.id, req.body, userId);
//   if (!updatedTask) {
//     res.status(500);
//     throw new Error("Internal Server Error");
//   }
//   res.status(200).json(updatedTask);
// });

// // Partially update a task (PATCH) for the authenticated user
// const patchTask = asyncHandler(async (req, res) => {
//   const userId = req.user.userId;
//   const updatedTask = await taskService.patchTask(req.params.id, req.body, userId);
//   if (!updatedTask) {
//     res.status(500);
//     throw new Error("Internal Server Error");
//   }
//   res.status(200).json(updatedTask);
// });

// // Delete a task for the authenticated user
// const deleteTask = asyncHandler(async (req, res) => {
//   const userId = req.user.userId;
//   const deletedTask = await taskService.deleteTask(req.params.id, userId);
//   if (!deletedTask) {
//     res.status(500);
//     throw new Error("Internal Server Error");
//   }
//   res.status(200).json({ message: "Task deleted successfully" });
// });

// module.exports = {
//   getAllTasks,
//   getTaskById,
//   createTask,
//   updateTask,
//   patchTask,
//   deleteTask,
// };