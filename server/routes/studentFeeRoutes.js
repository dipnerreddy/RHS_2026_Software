const express =
  require("express");

const router =
  express.Router();

const {
  getAllStudentFees,
  getStudentFee,
  updateBusDetails,
  updateTuitionDetails,
} = require(
  "../controllers/studentFeeController"
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

router.use(
  authorizeRoles(
    "SUPER_ADMIN",
    "BILLING_STAFF"
  )
);

router.get(
  "/",
  getAllStudentFees
);

router.get(
  "/:studentId",
  getStudentFee
);

router.put(
  "/:id/bus",
  updateBusDetails
);

router.put(
  "/:id/tuition",
  updateTuitionDetails
);

module.exports =
  router;