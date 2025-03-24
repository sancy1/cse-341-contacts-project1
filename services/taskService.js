const Task = require("../models/Task");


// Get all tasks for a user --------------------------------------------------------------
const getAllTasks = async (userId) => {
  try {
    const tasks = await Task.find({ user: userId });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error); // Loging the error for debugging
    throw new Error("Failed to fetch tasks");
  }
};


// Get a single task by ID for a user --------------------------------------------------------------
const getTaskById = async (taskId, userId) => {
  try {
    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404; 
      throw error;
    }

    return task;
  } catch (error) {
    console.error("Error fetching task by ID:", error); // Loging the error for debugging
    throw error; 
  }
};


// Create a new task for a user --------------------------------------------------------------
const createTask = async (taskData) => {
  try {
    const task = new Task(taskData);
    await task.save();
    return task;
  } catch (error) {
    console.error("Error creating task:", error); // Loging the error for debugging
    throw new Error("Failed to create task");
  }
};


// Update a task (PUT) for a user --------------------------------------------------------------
const updateTask = async (taskId, taskData, userId) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId }, 
      taskData,
      { new: true } 
    );

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404; 
      throw error;
    }

    return task;
  } catch (error) {
    console.error("Error updating task:", error); // Loging the error for debugging
    throw error; 
  }
};


// Partially update a task (PATCH) for a user --------------------------------------------------------------
const patchTask = async (taskId, taskData, userId) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId }, 
      { $set: taskData }, 
      { new: true, runValidators: true } 
    );

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404; 
      throw error;
    }

    return task;
  } catch (error) {
    console.error("Error patching task:", error); // Loging the error for debugging
    throw error; 
  }
};


// Delete a task for a user --------------------------------------------------------------
const deleteTask = async (taskId, userId) => {
  try {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId }); 

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404; 
      throw error;
    }

    return task;
  } catch (error) {
    console.error("Error deleting task:", error); 
    throw error; 
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
};































// const Task = require("../models/Task");

// // Get all tasks for a user
// const getAllTasks = async (userId) => {
//   return await Task.find({ user: userId });
// };

// // Get a single task by ID for a user
// const getTaskById = async (taskId, userId) => {
//   return await Task.findOne({ _id: taskId, user: userId });
// };

// // Create a new task for a user
// const createTask = async (taskData) => {
//   const task = new Task(taskData);
//   return await task.save();
// };

// // Update a task (PUT) for a user
// const updateTask = async (taskId, taskData, userId) => {
//   return await Task.findOneAndUpdate({ _id: taskId, user: userId }, taskData, { new: true });
// };

// // Partially update a task (PATCH) for a user
// const patchTask = async (taskId, taskData, userId) => {
//   return await Task.findOneAndUpdate({ _id: taskId, user: userId }, { $set: taskData }, { new: true });
// };

// // Delete a task for a user
// const deleteTask = async (taskId, userId) => {
//   return await Task.findOneAndDelete({ _id: taskId, user: userId });
// };

// module.exports = {
//   getAllTasks,
//   getTaskById,
//   createTask,
//   updateTask,
//   patchTask,
//   deleteTask,
// };