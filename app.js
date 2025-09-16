require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const tasksRouter = require('./routes/tasks');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware, routes, error handling
app.use(express.json());
app.use('/api/tasks', tasksRouter);
app.use(notFound);
app.use(errorHandler);


// Connect DB and run server
const start = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Atlas connected successfully');
        //Start server
        app.listen(PORT,() => {
            console.log(`Server is running on ${PORT}...`);
        })
    } catch{
        console.log('Failed to connect to the database.', error);
        process.exit(1);
    }
}
start();