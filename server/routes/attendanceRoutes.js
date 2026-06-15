const express =
  require("express");

const router =
  express.Router();

const authenticateUser =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const {
  markAttendance,
  getAttendanceHistory,
} = require(
  "../controllers/attendanceController"
);

// Mark attendance
router.post(
  "/mark",
  authenticateUser,
  authorizeRoles(
    "CLASS_TEACHER",
    "HOD",
    "SUPER_ADMIN"
  ),
  markAttendance
);

// Get attendance history
router.get(
  "/history",
  authenticateUser,
  authorizeRoles(
    "CLASS_TEACHER",
    "HOD",
    "SUPER_ADMIN"
  ),
  getAttendanceHistory
);

module.exports =
  router;