const express = require('express');
const bodyParser = require('body-parser');
const tasksRepository =  require("./tasksRepository")

const app = express();

app.use(bodyParser.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  const tasks = [];// tasksRepository.getAll()
  res.json(tasks);
});

// Get a specific task
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasksRepository.getById(taskId)

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasksRepository.createTask(newTask)
  res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const task = tasksRepository.updateTask(taskId, updatedTask)

  if (task != null) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasksRepository.deleteTask(taskId)
  res.sendStatus(204);
});

module.exports = app