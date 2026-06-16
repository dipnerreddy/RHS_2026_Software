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

const getTeachers =
  async (req, res) => {
    try {
      const teachers =
        await User.find({
          role:
            "CLASS_TEACHER",
        }).select(
          "-password"
        );

      res.status(200).json({
        success:
          true,
        data:
          teachers,
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

const assignClasses =
  async (req, res) => {
    try {
      const {
        userId,
        className,
        section,
      } = req.body;

      const teacher =
        await User.findById(
          userId
        );

      if (
        !teacher
      ) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "Teacher not found",
          });
      }

      if (
        teacher.role !==
        "CLASS_TEACHER"
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "User is not a class teacher",
          });
      }

      const alreadyAssigned =
        teacher.assignedClasses.some(
          (
            cls
          ) =>
            cls.className ===
              className &&
            cls.section ===
              section
        );

      if (
        alreadyAssigned
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Class already assigned",
          });
      }

      teacher.assignedClasses.push(
        {
          className,
          section,
        }
      );

      await teacher.save();

      res.status(200).json({
        success:
          true,
        message:
          "Class assigned successfully",
        data:
          teacher.assignedClasses,
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

const removeClassAssignment =
  async (req, res) => {
    try {
      const {
        userId,
        className,
        section,
      } = req.body;

      const teacher =
        await User.findById(
          userId
        );

      if (
        !teacher
      ) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "Teacher not found",
          });
      }

      teacher.assignedClasses =
        teacher.assignedClasses.filter(
          (
            cls
          ) =>
            !(
              cls.className ===
                className &&
              cls.section ===
                section
            )
        );

      await teacher.save();

      res.status(200).json({
        success:
          true,
        message:
          "Class removed successfully",
        data:
          teacher.assignedClasses,
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
  getTeachers,
  assignClasses,
  removeClassAssignment
};