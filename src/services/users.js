const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
  },
  {
    id: 2,
    username: "user",
    password: "user",
  },
];

const findById = (id) => {
  return users.find((user) => user.id == id);
};
const findByUsername = (username) => {
  return users.find((user) => user.username === username);
};

module.exports = {
  findById,
  findByUsername,
};
