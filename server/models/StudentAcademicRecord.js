const mongoose =
  require("mongoose");

const studentAcademicRecordSchema =
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

      rollNumber: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "ACTIVE",
          "PROMOTED",
          "TRANSFERRED",
          "DROPPED",
        ],
        default: "ACTIVE",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "StudentAcademicRecord",
    studentAcademicRecordSchema
  );