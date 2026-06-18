const mongoose = require("mongoose");

const studentFeeSchema =
  new mongoose.Schema(
    {
      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      academicYearId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true,
      },

      schoolFee: {
        type: Number,
        required: true,
        min: 0,
      },

      usesTuition: {
        type: Boolean,
        default: true,
      },

      tuitionFee: {
        type: Number,
        default: 0,
        min: 0,
      },

      usesBus: {
        type: Boolean,
        default: false,
      },

      busLocation: {
        type: String,
        default: null,
      },

      busFee: {
        type: Number,
        default: 0,
        min: 0,
      },

      discountAmount: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalFee: {
        type: Number,
        required: true,
      },

      paidAmount: {
        type: Number,
        default: 0,
      },

      balanceAmount: {
        type: Number,
        required: true,
      },

      dueDate: {
        type: Date,
        required: true,
      },

      lastPaymentDate: {
        type: Date,
        default: null,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "PARTIALLY_PAID",
          "PAID",
        ],
        default: "PENDING",
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

studentFeeSchema.index(
  {
    studentId: 1,
    academicYearId: 1,
    status: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.model(
    "StudentFee",
    studentFeeSchema
  );