const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  getOutstandingFees,
  getStudentOutstandingFee,
  getPaidStudents,
    getPartiallyPaidStudents,
    getPendingStudents,
    getCollectionSummary
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
  "/collection-summary",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getCollectionSummary
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
  "/paid-students",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getPaidStudents
);

router.get(
  "/partially-paid-students",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getPartiallyPaidStudents
);

router.get(
  "/pending-students",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getPendingStudents
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