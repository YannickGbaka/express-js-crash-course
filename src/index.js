const express = require("express");
const path = require("path");
const passport = require("passport");

const { router: recipesRouter } = require("./router/recipes");
const { router: productsRouter } = require("./router/products");
const authenticationRouter = require("./router/authentication");
const userRouter = require("./router/users");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/crash-course")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "teddy smith dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  req.session.isAuthenticated = true;
  req.sessionStore.set();
  console.log(req.session);
  console.log(req.sessionID);
  res.send("Hello world");
});

app.use(
  session({
    secret: "teddy",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000 * 60,
    },
  })
);

app.use("/api/v1/users", userRouter);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/auth", authenticationRouter);

app.use("/api/v1/recipes", recipesRouter);
app.use("/api/v1/products", productsRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
