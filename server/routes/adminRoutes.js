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
  assignRole,
} = require(
  "../controllers/adminController"
);

const {
  getTeachers,
  assignClasses,
  removeClassAssignment,
} = require(
  "../controllers/adminController"
);

router.put(
  "/assign-role",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  assignRole
);

router.get(
  "/teachers",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  getTeachers
);

router.put(
  "/assign-classes",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  assignClasses
);

router.put(
  "/remove-class",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  removeClassAssignment
);

module.exports =
  router;