const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  createDiscountRequest,
  getDiscountRequests,
} = require(
  "../controllers/discountRequestController"
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
  "/",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  createDiscountRequest
);

router.get(
  "/",
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  ),
  getDiscountRequests
);

module.exports =
  router;