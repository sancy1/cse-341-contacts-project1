const Task = require("../models/Task");

// Get all tasks for a user
const getAllTasks = async (userId) => {
  return await Task.find({ user: userId });
};

// Get a single task by ID for a user
const getTaskById = async (taskId, userId) => {
  return await Task.findOne({ _id: taskId, user: userId });
};

// Create a new task for a user
const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

// Update a task (PUT) for a user
const updateTask = async (taskId, taskData, userId) => {
  return await Task.findOneAndUpdate({ _id: taskId, user: userId }, taskData, { new: true });
};

// Partially update a task (PATCH) for a user
const patchTask = async (taskId, taskData, userId) => {
  return await Task.findOneAndUpdate({ _id: taskId, user: userId }, { $set: taskData }, { new: true });
};

// Delete a task for a user
const deleteTask = async (taskId, userId) => {
  return await Task.findOneAndDelete({ _id: taskId, user: userId });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
};