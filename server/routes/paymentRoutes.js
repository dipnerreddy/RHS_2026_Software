const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  collectPayment,
  getAllPayments,
  getStudentPayments,
  getPaymentById
} = require(
  "../controllers/paymentController"
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

  getAllPayments
);

router.get(
  "/student/:studentFeeId",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getStudentPayments
);

router.get(
  "/:paymentId",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  getPaymentById
);

router.post(
  "/collect",

  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),

  collectPayment
);

module.exports =
  router;