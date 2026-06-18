const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  getAllReceipts,
  getReceiptByNumber,
  getStudentReceipts,
} = require(
  "../controllers/receiptController"
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
  "/",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getAllReceipts
);

router.get(
  "/student/:studentFeeId",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getStudentReceipts
);

router.get(
  "/:receiptNumber",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getReceiptByNumber
);

module.exports =
  router;