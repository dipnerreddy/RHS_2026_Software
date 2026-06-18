const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  exportOutstandingFeesCSV,
  exportOutstandingFeesExcel,

  exportPaidStudentsCSV,
  exportPaidStudentsExcel,

  exportPartiallyPaidStudentsCSV,
  exportPartiallyPaidStudentsExcel,

  exportPendingStudentsCSV,
  exportPendingStudentsExcel,

  exportCollectionSummaryCSV,
  exportCollectionSummaryExcel,
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

/*
|--------------------------------------------------------------------------
| Outstanding Fees
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Paid Students
|--------------------------------------------------------------------------
*/

router.get(
  "/paid-students/csv",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  exportPaidStudentsCSV
);

router.get(
  "/paid-students/excel",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  exportPaidStudentsExcel
);

/*
|--------------------------------------------------------------------------
| Partially Paid Students
|--------------------------------------------------------------------------
*/

router.get(
  "/partially-paid-students/csv",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  exportPartiallyPaidStudentsCSV
);

router.get(
  "/partially-paid-students/excel",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  exportPartiallyPaidStudentsExcel
);

/*
|--------------------------------------------------------------------------
| Pending Students
|--------------------------------------------------------------------------
*/

router.get(
  "/pending-students/csv",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  exportPendingStudentsCSV
);

router.get(
  "/pending-students/excel",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  exportPendingStudentsExcel
);

/*
|--------------------------------------------------------------------------
| Collection Summary
|--------------------------------------------------------------------------
*/

router.get(
  "/collection-summary/csv",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  exportCollectionSummaryCSV
);

router.get(
  "/collection-summary/excel",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  exportCollectionSummaryExcel
);

module.exports =
  router;