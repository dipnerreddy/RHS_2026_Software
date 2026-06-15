const mongoose =
  require("mongoose");

const attendanceSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Student",

        required: true,
      },

      academicYearId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref:
          "AcademicYear",

        required: true,
      },

      className: {
        type: String,
        required: true,
      },

      section: {
        type: String,
        required: true,
      },

      attendanceDate: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "PRESENT",
          "ABSENT",
          "LEAVE",
        ],
        required: true,
      },

      markedBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      markedAt: {
        type: Date,
        default:
          Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

attendanceSchema.index(
  {
    studentId: 1,
    attendanceDate: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.model(
    "Attendance",
    attendanceSchema
  );