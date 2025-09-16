const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: [true,'Vui lòng nhập tên task'],
        maxlength: [20,'Tên task không được vượt quá 20 ký tự']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;