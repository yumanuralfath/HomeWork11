import prisma from '../config/database.js';

export const verifyUser = async (req, res, next) => {
  try {
    if (!req.session.token) {
      return res.status(401).json({
        message: "Please login to Your Account"
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        id: req.session.userID // Menggunakan id dari sesi pengguna
      },
      select: { // Memilih atribut yang ingin Anda kembalikan
        id: true,
        email: true,
        gender: true,
        role: true
      }
    });
    if (!user) {
      return res.status(404).json({ msg: 'User Not Found, Please Login Again' });
    }
    req.user = user; 
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
