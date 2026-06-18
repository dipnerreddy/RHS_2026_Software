const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  getOutstandingFees,
  getStudentOutstandingFee,
} = require(
  "../controllers/reportController"
);

const authenticateUser =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

router.use(
  authenticateUser
);

router.get(
  "/outstanding-fees",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getOutstandingFees
);

router.get(
  "/outstanding-fees/:studentId",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getStudentOutstandingFee
);

module.exports =
  router;