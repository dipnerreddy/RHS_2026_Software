const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  collectPayment,
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