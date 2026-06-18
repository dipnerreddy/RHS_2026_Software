const express = require("express");

const router = express.Router();

const {
  createFeeTemplate,
  getFeeTemplates,
} = require(
  "../controllers/feeTemplateController"
);

const authenticateUser = require(
  "../middleware/authMiddleware"
);

const authorizeRoles = require(
  "../middleware/roleMiddleware"
);

router.post(
  "/",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  createFeeTemplate
);

router.get(
  "/",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  getFeeTemplates
);

module.exports = router;