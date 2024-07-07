const express = require('express')

const { tasksController } = require("../controllers");

const router = express.Router()

router.get('/tasks/:id', tasksController.getOneTask)
router.get('/tasks', tasksController.getAllTasks)
router.post('/tasks/', tasksController.createOneTask)
router.put("/tasks/:id", tasksController.updateOneTask);

module.exports = router