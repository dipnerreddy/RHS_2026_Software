const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const academicYearRoutes = require("./routes/academicYearRoutes");

const studentRoutes =
  require(
    "./routes/studentRoutes"
  );


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully",
  });
});

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(
  "/api/academic-years",
  academicYearRoutes
);

app.use(
  "/api/students",
  studentRoutes
);