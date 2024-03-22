import bcrypt from 'bcrypt';
const saltRounds = 9;

export const hashPassword = (Password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(Password, salt);
};

export const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
