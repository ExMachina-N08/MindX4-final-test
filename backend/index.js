const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createError = require("http-errors");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const userRoutes = require("./router/user");
const movieRoutes = require("./router/movie");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({ error: err.message });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
