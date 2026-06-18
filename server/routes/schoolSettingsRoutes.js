const express =
  require(
    "express"
  );

const router =
  express.Router();

const {
  createSchoolSettings,
  getSchoolSettings,
  updateSchoolSettings,
} = require(
  "../controllers/schoolSettingsController"
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
    "SUPER_ADMIN"
  ),

  createSchoolSettings
);

router.get(
  "/",

  authenticateUser,

  getSchoolSettings
);

router.put(
  "/",

  authorizeRoles(
    "SUPER_ADMIN"
  ),

  updateSchoolSettings
);

module.exports =
  router;