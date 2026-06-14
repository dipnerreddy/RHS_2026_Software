const mongoose =
  require("mongoose");

const studentSchema =
  new mongoose.Schema(
    {
      admissionNumber: {
        type: String,
        unique: true,
      },

      studentName: {
        type: String,
        required: true,
        trim: true,
      },

      fatherName: {
        type: String,
        required: true,
        trim: true,
      },

      motherName: {
        type: String,
        trim: true,
      },

      primaryPhone: {
        type: String,
        required: true,
      },

      secondaryPhone: {
        type: String,
        default: "",
      },

      gender: {
        type: String,
        enum: [
          "MALE",
          "FEMALE",
          "OTHER",
        ],
        required: true,
      },

      dateOfBirth: {
        type: Date,
        required: true,
      },

      admissionDate: {
        type: Date,
        required: true,
      },

      address: {
        type: String,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "ACTIVE",
          "TRANSFERRED",
          "DROPPED",
          "GRADUATED",
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
    "Student",
    studentSchema
  );