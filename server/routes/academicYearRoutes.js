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
  createAcademicYear,
  getAcademicYears,
  getActiveAcademicYear,
} = require(
  "../controllers/academicYearController"
);

router.post(
  "/",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  createAcademicYear
);

router.get(
  "/",
  authenticateUser,
  getAcademicYears
);

router.get(
  "/active",
  authenticateUser,
  getActiveAcademicYear
);

module.exports =
  router;