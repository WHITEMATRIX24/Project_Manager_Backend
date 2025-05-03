const { Router } = require("express");
const {
  createTasksController,
  deleteTasksController,
} = require("../controllers/task");
const router = Router();

router.post("/create-task", createTasksController);
router.delete("/delete-task/:taskId", deleteTasksController);

module.exports = router;
