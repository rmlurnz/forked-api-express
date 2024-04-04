require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/user");

// express app
const app = express();

app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/user", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
