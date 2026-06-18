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

const {
  approveDiscountRequest,
  rejectDiscountRequest,
} = require(
  "../controllers/discountRequestController"
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

router.put(
  "/:id/approve",

  authorizeRoles(
    "SUPER_ADMIN"
  ),

  approveDiscountRequest
);

router.put(
  "/:id/reject",

  authorizeRoles(
    "SUPER_ADMIN"
  ),

  rejectDiscountRequest
);

module.exports =
  router;