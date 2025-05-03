const TaskModel = require("../models/tasks");

const createTasksController = async (req, res) => {
  try {
    const {
      project_id,
      company_id,
      name,
      description,
      state,
      due_date,
      assignee,
      assigned_to,
      created_at,
      attachments,
      comments,
      priority,
      estimated_time,
      parent_module_id,
      is_active,
      task_closure_time,
      task_closure_comment,
    } = req.body;

    // validation
    if (
      !project_id ||
      !company_id ||
      !name ||
      !description ||
      !state ||
      !due_date ||
      !assignee ||
      !assigned_to ||
      !created_at ||
      !attachments ||
      !comments ||
      !priority ||
      !estimated_time ||
      !parent_module_id ||
      !is_active ||
      !task_closure_time ||
      !task_closure_comment
    )
      return res.status(400).json({ message: "incomplete request" });

    await new TaskModel({
      project_id,
      company_id,
      name,
      description,
      state,
      due_date,
      assignee,
      assigned_to,
      created_at,
      attachments,
      comments,
      priority,
      estimated_time,
      parent_module_id,
      is_active,
      task_closure_time,
      task_closure_comment,
    }).save();
    res.status(200).json({ message: "task created successfully" });
  } catch (error) {
    console.error(`error in creating tasks: ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

const deleteTasksController = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) return res.status(400).json({ message: "Incomplete request" });

    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    res.status(200).json({ message: "task deleted sucessfully" });
  } catch (error) {
    console.error(`error in deleting tasks: ${error}`);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  createTasksController,
  deleteTasksController,
};
