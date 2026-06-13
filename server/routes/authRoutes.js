const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  resetPassword,
  getCurrentUser
} = require("../controllers/authController");

const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();
/// Middleware for role-based access control
const authorizeRoles =
  require("../middleware/roleMiddleware");

/// Route for teacher dashboard access with role-based authorization
router.get(  "/teacher-dashboard",
  authenticateUser,
    authorizeRoles(
    "CLASS_TEACHER",
    "SUPER_ADMIN"
  ),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Teacher Dashboard Access Granted",
    });
  }
);
/// Route for billing dashboard access with role-based authorization
router.get(  "/billing-dashboard",
  authenticateUser,
  authorizeRoles(
    "BILLING_STAFF",
    "SUPER_ADMIN"
  ),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Billing Dashboard Access Granted",
    });
  }
);
/// Route for HOD dashboard access with role-based authorization
router.get(
  "/hod-dashboard",
  authenticateUser,
  authorizeRoles(
    "HOD",
    "SUPER_ADMIN"
  ),
  (req, res) => {
    res.json({
      success: true,
      message:
        "HOD Dashboard Access Granted",
    });
  }
);
/// Route for admin dashboard access with role-based authorization
router.get(
  "/admin-dashboard",
  authenticateUser,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Admin Dashboard Access Granted",
    });
  }
);
/// Route to get current user profile
router.get("/me", authenticateUser, getCurrentUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get( "/profile",
  authenticateUser,
  getProfile
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

module.exports = router;