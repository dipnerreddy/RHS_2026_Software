const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  generateReceiptPdf,
} = require(
  "../controllers/receiptPdfController"
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
  "/:receiptNumber/pdf",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  generateReceiptPdf
);

module.exports =
  router;