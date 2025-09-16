const Task = require('../models/Task');
const HttpError = require('../models/errorModel');

const createTask = async (req, res, next) => {
    const { name, completed } = req.body;
    const newTask = await Task.create({ name, completed });
    res.status(201).json(newTask);
};

const getTask = async (req, res, next) => {
    const { id } = req.params;
//  const task = await Task.findById(id);
    const task = await Task.findOne({ _id: id });
    if (!task) {
        return next(new HttpError('Could not find task for the provided id.', 404));
    }
    res.status(200).json(task);
};

const getAllTasks = async (req, res, next) => {
        const tasks = await Task.find();
        res.status(200).json(tasks);
};

const updateTask = async (req, res, next) => {
    const { id } = req.params;
    const { name, completed } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
        { _id: id },
        { name, completed },
        { new: true, runValidators: true }
    );
    if (!updatedTask) {
        return next(new HttpError('Could not find task for the provided id.', 404));
    }
    res.status(200).json(updatedTask);
};

const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: id });
    if (!deletedTask) {
        return next(new HttpError('Could not find task for the provided id.', 404));
    }
    res.status(200).json({ message: 'Task deleted successfully' });
};

module.exports = {
    createTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
};
