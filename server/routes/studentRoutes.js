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
  createStudent,
  getStudents,
  searchStudents,
  updateStudentStatus
} = require(
  "../controllers/studentController"
);

router.post(
  "/",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  createStudent
);

router.get(
  "/",
  authenticateUser,
  getStudents
);

router.get(
  "/search",
  authenticateUser,
  searchStudents
);

router.put(
  "/status",
  authenticateUser,
  authorizeRoles(
    "HOD",
    "SUPER_ADMIN"
  ),
  updateStudentStatus
);

module.exports =
  router;