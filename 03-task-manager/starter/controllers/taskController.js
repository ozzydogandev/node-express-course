const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const CustomAPIError = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const { title } = req.body;
  if (!req.body.title || req.body.title.trim() === '') {
    return next(new CustomAPIError('Task title cannot be empty', 400));
  }

  const task = await Task.create({ title });
  res.status(201).json({ task });
});

const getTaskById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new CustomAPIError(`No task with id: ${id}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(new CustomAPIError(`No task with id: ${id}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return next(new CustomAPIError(`No task with id: ${id}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
