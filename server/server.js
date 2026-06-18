const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const academicYearRoutes = require("./routes/academicYearRoutes");
const discountRequestRoutes = require("./routes/discountRequestRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const receiptRoutes = require("./routes/receiptRoutes");
const schoolSettingsRoutes = require("./routes/schoolSettingsRoutes");
const receiptPdfRoutes = require("./routes/receiptPdfRoutes");Bil


const attendanceRoutes =
  require(
    "./routes/attendanceRoutes"
  );

const feeTemplateRoutes =
  require(
    "./routes/feeTemplateRoutes"
  );
  
const studentRoutes =
  require(
    "./routes/studentRoutes");
const adminRoutes =
  require(
    "./routes/adminRoutes"
  );

const studentAcademicRoutes =
  require(
    "./routes/studentAcademicRoutes"
  );

const studentFeeRoutes =
  require(
    "./routes/studentFeeRoutes"
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

app.use(
  "/api/student-academic",
  studentAcademicRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/fee-templates",
  feeTemplateRoutes
);

app.use(
  "/api/student-fees",
  studentFeeRoutes
);

app.use(
  "/api/discount-requests",
  discountRequestRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/receipts",
  receiptRoutes
);

app.use(
  "/api/school-settings",
  schoolSettingsRoutes
);

app.use(
  "/api/receipts",
  receiptPdfRoutes
);