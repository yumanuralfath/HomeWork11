import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaskListController {
  // Create a new task list
  static create = async (req, res, next) => {
    try {
      const { userId, title, content } = req.body;
      const newTaskList = await prisma.tasklist.create({
        data: {
          userId,
          title,
          content,
        },
      });
      res.json(newTaskList);
    } catch (error) {
      next();
    }
  };

  // Get all task lists
  static findAll = async (req, res, next) => {
    try {
      const taskLists = await prisma.tasklist.findMany();
      res.json(taskLists);
    } catch (error) {
      next();
    }
  };

  // Get a single task list by ID
  static findOne = async (req, res, next) => {
    try {
      const taskListId = parseInt(req.params.id);
      const taskList = await prisma.tasklist.findUnique({
        where: { id: taskListId },
        include: { author: true },
      });
      if (!taskList) {
        return res.status(404).json({ message: 'Task list not found' });
      }
      res.json(taskList);
    } catch (error) {
      next();
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

  // Delete a task list by ID
  static delete = async (req, res, next) => {
    try {
      const taskListId = parseInt(req.params.id);
      await prisma.tasklist.delete({
        where: { id: taskListId },
      });
      res.status(204).send();
    } catch (error) {
      next();
    }
  };
}

export default TaskListController;
