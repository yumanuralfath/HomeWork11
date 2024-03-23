import prisma from '../config/database.js'
import { hashPassword } from '../lib/bcrypt.js';

class UserController {
  // Create a new user
  static create = async (req, res, next) => {
    try {
      const { email, Password, confirmPassword } = req.body;

      // Check if password and confirmPassword are valid
      if (Password !== confirmPassword) { throw new Error('Password and confirmPassword are not valid') }

      // Check if password is empty
      if (Password === '' || Password === null) { throw new Error('Empty password not allowed') }

      // Check valid email format
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Hash password before sending to server
      const hashPass = await hashPassword(Password);

      // Save user data to the database
      await prisma.user.create({
        data: {
          email,
          password: hashPass, // Use hashed password
        },
      });
      res.status(200).json({ msg: 'Created Account Successfully' })
    } catch (error) {
      next(error); // Call next to handle the error
    }
  };


  // Get all users
  static findAll = async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      const usersDisplay = users.map(user => ({ id: user.id, email: user.email }));  //just id and email displayed
      res.status(200).json(usersDisplay);
    } catch (error) {
      next();
    }
  };

  // Get a single user by ID
  static findOne = async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Filter hanya id dan email
      const filteredUser = { id: user.id, email: user.email };
      console.log(filteredUser);
      res.json(filteredUser);
    } catch (error) {
      next(error);
    }
  };


  // Update a user by ID
  static update = async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      const { email } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { email },
      });
      const updatedUserId = { id: userId, email: updatedUser.email };
      res.json(updatedUserId);
    } catch (error) {
      next();
    }
  };

  // Delete a user by ID
  static delete = async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      await prisma.user.delete({
        where: { id: userId },
      });
      res.json("User " + userId + " deleted");
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
