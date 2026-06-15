const mongoose =
  require("mongoose");

const attendanceChangeLogSchema =
  new mongoose.Schema(
    {
      attendanceId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref:
          "Attendance",

        required: true,
      },

      studentId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref:
          "Student",

        required: true,
      },

      oldStatus: {
        type: String,
        enum: [
          "PRESENT",
          "ABSENT",
          "LEAVE",
        ],
        required: true,
      },

      newStatus: {
        type: String,
        enum: [
          "PRESENT",
          "ABSENT",
          "LEAVE",
        ],
        required: true,
      },

      reason: {
        type: String,
        required: true,
        trim: true,
      },

      changedBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      changedAt: {
        type: Date,
        default:
          Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "AttendanceChangeLog",
    attendanceChangeLogSchema
  );