import prisma from '../config/database.js'

class TaskListController {
  // Create a new task list
  static create = async (req, res, next) => {
    try {
      const { title, content, Completed } = req.body;
      const newTaskList = await prisma.tasklist.create({
        data: {
          title,
          content,
          Completed,
        },
      });
      res.status(200).json({
        newTaskList,
        msg: 'Created task Successfully'
      });

    } catch (error) {
      next(error);
    }
  };

  // Get all task lists (exclude soft deleted)
  static findAll = async (req, res, next) => {
    try {
      const taskLists = await prisma.tasklist.findMany({
        where: {
          deleted_at: null // Hanya ambil task list yang belum dihapus secara soft
        }
      });
      res.json(taskLists);
    } catch (error) {
      next(error);
    }
  };

  // Get a single task list by ID (exclude soft deleted)
  static findOne = async (req, res, next) => {
    try {
      const taskListId = parseInt(req.params.id);
      const taskList = await prisma.tasklist.findUnique({
        where: { id: taskListId },
      });

      if (!taskList) {
        return res.status(404).json({ message: 'TODO list not found' });
      }

      if (taskList.deleted_at !== null) {
        return res.status(404).json({ message: 'TODO list not found' });
      }

      res.json(taskList);
    } catch (error) {
      next(error);
    }
  };

  // Update a task list by ID
  static update = async (req, res, next) => {
    try {
      const taskListId = parseInt(req.params.id);
      const { title, content, completed } = req.body;
      const updatedTaskList = await prisma.tasklist.update({
        where: { id: taskListId },
        data: { title, content, completed },
      });
      res.json(updatedTaskList);
    } catch (error) {
      next();
    }
  };

  static delete = async (req, res, next) => {
    try {
      const taskListId = parseInt(req.params.id);

      // Soft delete task list by setting 'deleted_at' timestamp
      await prisma.tasklist.update({
        where: { id: taskListId },
        data: { deleted_at: new Date() }
      });

      res.json("task " + taskListId + " deleted");
    } catch (error) {
      next(error);
    }
  };
}

export default TaskListController;
