const express = require("express");
const cors = require("cors");

const config = require("./config");
const { activitiesRoutes, tasksRoutes } = require("./routes");

const app = express();

// setting
app.set("port", config.PORT);

app.use(cors());

//use of middleware to set the server to accept json data form
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send({ messge: "The app is running" });
});

// routes
app.use(activitiesRoutes);
app.use(tasksRoutes);

// middleware to handle errors
app.use((error, req, res, next) => {
  return res.json({message: error.message})
})

module.exports = app;