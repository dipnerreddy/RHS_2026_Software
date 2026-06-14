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
  getAssignedStudents,
} = require(
  "../controllers/studentAcademicController"
);

const {
  assignStudentToClass,
  getStudentsByClass,
} = require(
  "../controllers/studentAcademicController"
);

router.post(
  "/assign",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  assignStudentToClass
);

router.get(
  "/class",
  authenticateUser,
  getStudentsByClass
);

router.get(
  "/assigned",
  authenticateUser,
  authorizeRoles(
    "CLASS_TEACHER",
    "HOD",
    "SUPER_ADMIN"
  ),
  getAssignedStudents
);

module.exports =
  router;