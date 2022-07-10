const Tasks = require('../models/tasksModel');
const catchAsync = require('../utils/catchAsync');

const getTasks = catchAsync(async (req, res, next) => {
  const tasks = await Tasks.find();
  res.status(201).json({ tasks });
});

const getTask = catchAsync(async (req, res, next) => {
  const task = await Tasks.findById(req.params.id);
  res.status(200).json({ task });
});

const createTask = catchAsync(async (req, res, next) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({ task });
});

const updateTask = catchAsync(async (req, res, next) => {
  const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    task,
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const task = await Tasks.findByIdAndDelete(req.params.id);
  res.status(204).json({});
});

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
