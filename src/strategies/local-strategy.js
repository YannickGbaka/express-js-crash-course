const passport = require("passport");
const { findByUsername, findById } = require("../services/users");
const { Strategy } = require("passport-local");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  console.log("Inside serializer \n");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside deserializer \n" + id);
  try {
    const user = await findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = await findByUsername(username);
        if (!user) {
          throw new Error("User not found");
        } else if (!comparePassword(password, user.password)) {
          throw new Error("Wrong password");
        }
        done(null, user);
      } catch (e) {
        done(e, null);
      }
    }
  )
);
