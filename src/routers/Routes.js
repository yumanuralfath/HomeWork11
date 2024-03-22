import express from 'express';
import UserController from '../controllers/user.controller.js';
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
router.get("/api/users", verifyUser, UserController.findAll) //get all users
router.post('/api/users/', UserController.create) // Register User

export default router;