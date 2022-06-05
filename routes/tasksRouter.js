const router = require('express').Router();
const tasksController = require('../controllers/tasksContoller');

router
  .route('/')
  .get(tasksController.getTasks)
  .post(tasksController.createTask);

router
  .route('/:id')
  .get(tasksController.getTask)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask);
module.exports = router;
