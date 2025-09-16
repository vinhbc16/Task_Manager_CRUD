const Task = require('../models/Task');
const HttpError = require('../models/errorModel');
const mongoose = require('mongoose');

const createTask = async (req, res, next) => {
    try {
        const { name, completed } = req.body;
        const newTask = await Task.create({ name, completed });
        res.status(201).json(newTask);
    } catch (error) {
        return next(new HttpError('Creating task failed, please try again.', 500));
    }
};

const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
    //  const task = await Task.findById(id);
        const task = await Task.findOne({ _id: id });
        if (!task) {
            return next(new HttpError('Could not find task for the provided id.', 404));
        }
        res.status(200).json(task);
    } catch (error) {
        return next(new HttpError('Fetching task failed, please try again later.', 500));
    }
};

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        return next(new HttpError('Fetching tasks failed, please try again later.', 500));
    }
};

const updateTask = async (req, res, next) => {
    try {
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
    } catch (error) {
        return next(new HttpError('Updating task failed, please try again later.', 500));
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findOneAndDelete({ _id: id });
        if (!deletedTask) {
            return next(new HttpError('Could not find task for the provided id.', 404));
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return next(new HttpError('Deleting task failed, please try again later.', 500));
    }
};

module.exports = {
    createTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
};
