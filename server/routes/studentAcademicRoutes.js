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
  promoteStudent
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


router.post(
  "/promote",
  authenticateUser,
  authorizeRoles(
    "HOD",
    "SUPER_ADMIN"
  ),
  promoteStudent
);

module.exports =
  router;