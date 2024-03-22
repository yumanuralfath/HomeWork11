import { generateToken } from '../lib/jwt.js'
import { comparePassword } from '../lib/bcrypt.js'
import prisma from '../config/database.js'

// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const match = comparePassword(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Wrong password' });

    const payload = {
      userID: user.id,
      email: user.email,
    };

    const token = generateToken(payload);

    console.log(token);
    req.session.token = token;
    req.session.userID = user.id;

    res.status(200).json({ id: user.id, email: user.email, token });
  } catch (error) {
    next(error);
  }
}

// check account for auth
export const me = async (req, res, next) => {
  try {
    if (!req.session.token) {
      return res.status(401).json({ msg: 'Please Login again' });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.userID,
      },
      select: {
        id: true,
        email: true,
      }
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found, Please Login Again' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// LogOut For Destroy Session
export const logout = async (req, res, next) => {
  try {
    await req.session.destroy();

    res.status(200).json({ msg: 'Log Out Success' });
  } catch (error) {
    next(error);
  }
}
