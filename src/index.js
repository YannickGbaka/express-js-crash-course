const express = require("express");
const path = require("path");
const session = require("express-session");

const { router: recipesRouter } = require("./router/recipes");
const { router: productsRouter } = require("./router/products");
const authenticationRouter = require("./router/authentication");

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

app.use("/api/v1/auth", authenticationRouter);
app.use("/api/v1/recipes", recipesRouter);
app.use("/api/v1/products", productsRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
