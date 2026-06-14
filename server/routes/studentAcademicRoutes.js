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

module.exports =
  router;