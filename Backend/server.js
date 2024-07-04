const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const testRoute = require("./routes/testRoute");
const userRoutes = require("./routes/userRoutes");
const referralRoutes = require("./routes/referralRoutes");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", testRoute);
app.use("/api/users", userRoutes);

app.use("/api/referrals", referralRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
