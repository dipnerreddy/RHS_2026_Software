const User =
  require("../models/User");

const VALID_ROLES = [
  "HOD",
  "CLASS_TEACHER",
  "BILLING_STAFF",
];

const assignRole =
  async (req, res) => {
    try {
      const {
        userId,
        newRole,
      } = req.body;

      // Validate role
      if (
        !VALID_ROLES.includes(
          newRole
        )
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Invalid role",
          });
      }

      // Find user
      const user =
        await User.findById(
          userId
        );

      if (!user) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "User not found",
          });
      }

      // Prevent assigning SUPER_ADMIN
      if (
        newRole ===
        "SUPER_ADMIN"
      ) {
        return res
          .status(403)
          .json({
            success:
              false,
            message:
              "Cannot assign SUPER_ADMIN role",
          });
      }

      // Prevent no-op
      if (
        user.role ===
        newRole
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "User already has this role",
          });
      }

      const oldRole =
        user.role;

      user.role =
        newRole;

      await user.save();

      res.status(200).json({
        success:
          true,

        message:
          "Role updated successfully",

        data: {
          userId:
            user._id,

          email:
            user.email,

          oldRole,

          newRole,
        },
      });
    } catch (error) {
      console.error(
        error
      );

      res.status(500).json({
        success:
          false,
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  assignRole,
};