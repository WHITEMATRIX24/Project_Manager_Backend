const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
connectDB();

const app = express();

// route handlers
const commentRoutes = require("./routes/commentRoutes");
const teamRoutes = require("./routes/teamRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
// middlewares
app.use(express.json());

// routes
app.use("/api/comments", commentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/modules", moduleRoutes);

// port listening
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
