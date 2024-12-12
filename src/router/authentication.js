const { Router, response } = require("express");
const session = require("express-session");
const { body, validationResult, matchedData } = require("express-validator");
const passport = require("passport");
require("../strategies/local-strategy");

const registeredUsers = [
  {
    username: "admin",
    password: "admin",
  },
];
const router = new Router();

// router.get(
//   "/login",
//   body("username").isString().withMessage("The username is required"),
//   body("password")
//     .isLength({ min: 5, max: Infinity })
//     .withMessage("The min length is 8"),
//   (req, res) => {
//     if (req.session.user) {
//       return res.status(200).json({ message: "User already logged in" });
//     }
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//     }
//     const { username, password } = matchedData(req);
//     const user = registeredUsers.find((u) => u.username === username);
//     console.log(user);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if (user.password != password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }
//     req.session.user = user;
//     console.log(req.session);
//     res.status(200).json({ message: "Login successful" });
//   }
// );

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Ok" }).status(200);
});
router.get("/status", (req, res) => {
  console.log(req.session);
  return req.user
    ? res.json(req.user)
    : res.status(401).json({ message: "Not authenticated" });
});

router.post("/logout", (request, response) => {
  if (!request.user) return response.status(401).json("Unauthenticated");
  request.logout((err) => {
    if (err) return response.status(400);
    response.send(200);
  });
});
module.exports = router;
