import express from 'express';
import UserController from '../controllers/user.controller.js';
import TaskListController from '../controllers/tasklist.controller.js';
import { verifyUser } from '../middlewares/AuthUsers.js';
import { login, logout, me } from '../controllers/auth.controller.js';

const router = express.Router()

// Router Welcome
router.get('/', function (req, res) {
  res.send('Selamat Datang Di Homework 11')
})

// router for auth
router.get('/api/users/me', me) // check status account
router.post('/api/users/login', login) // login route
router.delete('/api/users/logout', logout) // Logout route

// router for user management
router.get('/api/users/', verifyUser, UserController.findAll) //get all users
router.post('/api/users/', UserController.create) // Register User
router.get('/api/users/:id', verifyUser, UserController.findOne) // Get A User Data
router.put('/api/users/:id', verifyUser, UserController.update) // Update a User Data
router.delete('/api/users/:id', verifyUser, UserController.delete) // Delete a User Data

//route for tasklist
router.post('/api/tasklists/', verifyUser, TaskListController.create) // Create a Task List
router.get('/api/tasklists/', verifyUser, TaskListController.findAll) // Find all task
router.get('/api/tasklists/:id', verifyUser, TaskListController.findOne) // Find a Todo list
router.put('/api/tasklists/:id', verifyUser, TaskListController.update) //update a Task
router.delete('/api/tasklists/:id', verifyUser, TaskListController.delete) //delete a Task

export default router;