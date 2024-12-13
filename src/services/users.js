const User = require("../mongoose/schemas/user");

const findById = (id) => {
  return User.findById(id);
};
const findByUsername = async (username) => {
  return await User.findOne({ username });
};

module.exports = {
  findById,
  findByUsername,
};
