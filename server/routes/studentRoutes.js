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

module.exports =
  router;