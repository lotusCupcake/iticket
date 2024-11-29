const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { port } = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); // Import category routes
const morgan = require("morgan");

const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/categories", categoryRoutes); // Kategori routes

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
