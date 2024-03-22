import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router()

// Router Welcome
router.get('/', function (req, res) {
  res.send('Selamat Datang Di Homework 11')
})

// router for user management
router.post('/api/users/', UserController.create) // Register User

export default router