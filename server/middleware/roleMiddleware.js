const authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (
        !allowedRoles.includes(userRole)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied. Unauthorized role.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

module.exports = authorizeRoles;