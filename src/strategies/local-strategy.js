const passport = require("passport");

const { Strategy } = require("passport-local");

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

passport.use(
  new Strategy((username, password, done) => {
    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) {
        throw new Error("User not found");
      } else if (findUser.password != password)
        throw new Error("Wrong password");
      done(null, findUser);
    } catch (e) {
      done(e, null);
    }
  })
);
