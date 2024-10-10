const express = require("express");
const Redis = require("ioredis");
const imageRoutes = require("./src/routes/imageRoutes");
const database = require("./src/utils/database");

const app = express();
// Create a new Redis instance
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
  connectTimeout: 30000,
});

// Test the Redis connection
redis
  .ping()
  .then((result) => {
    console.log("Redis connection successful:", result);
  })
  .catch((error) => {
    console.error("Redis connection failed:", error);
  });
app.get("/test", (req, res) => {
  res.json({ message: "Server is up and running!" });
});
// Middleware to parse JSON requests
app.use(express.json());
// Middleware to handle timeout
app.use((req, res, next) => {
  res.setTimeout(300000, () => {
    console.log("Request has timed out.");
    res.status(408).send("Request has timed out.");
  });
  next();
});
app.use("/api/images", imageRoutes);

// Connect to the database
database.connect();

module.exports = app;
