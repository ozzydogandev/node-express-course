const Task = require('../models/task');

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json({ task });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json({ task });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json({ task });
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
