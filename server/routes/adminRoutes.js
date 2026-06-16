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

router.put(
  "/assign-role",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  assignRole
);

module.exports =
  router;