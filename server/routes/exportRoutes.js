const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  exportOutstandingFeesCSV,
  exportOutstandingFeesExcel,
} = require(
  "../controllers/exportController"
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
  "/outstanding-fees/csv",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  exportOutstandingFeesCSV
);

router.get(
  "/outstanding-fees/excel",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  exportOutstandingFeesExcel
);

module.exports =
  router;