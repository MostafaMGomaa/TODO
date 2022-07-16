const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const tasksRouter = require('./routes/tasksRouter');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// req.body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;
