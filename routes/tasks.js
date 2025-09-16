const express = require('express');
const { createTask , getTask , getAllTasks , updateTask , deleteTask } = require('../controllers/tasks');
const router = express.Router();


router.route('/').post(createTask).get(getAllTasks);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;