const passport = require("passport");
const { findByUsername, findById } = require("../services/users");
const { Strategy } = require("passport-local");

passport.serializeUser((user, done) => {
  console.log("Inside serializer \n");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Inside deserializer \n" + id);
  try {
    const user = findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy({ usernameField: "email" }, (email, password, done) => {
    try {
      const user = findByUsername(email);
      if (!user) {
        throw new Error("User not found");
      } else if (user.password != password) {
        throw new Error("Wrong password");
      }
      done(null, user);
    } catch (e) {
      done(e, null);
    }
  })
);
