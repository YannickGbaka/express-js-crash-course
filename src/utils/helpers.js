const bcrypt = require("bcrypt");

const saltRound = 10;

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRound);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
