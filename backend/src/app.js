const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { port } = require("./config/env");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const ticketRoutes = require("./routes/ticketRouter");
const assignmentRoutes = require("./routes/assignmentRoutes");
const morgan = require("morgan");

const app = express();

connectDB();

// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/assignment", assignmentRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
