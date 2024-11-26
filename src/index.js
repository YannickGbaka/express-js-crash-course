const express = require("express");
const path = require("path");

const { router: recipesRouter } = require("./router/recipes");
const { router: productsRouter } = require("./router/products");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

app.use("/api/v1/recipes", recipesRouter);
app.use("/api/v1/products", productsRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
