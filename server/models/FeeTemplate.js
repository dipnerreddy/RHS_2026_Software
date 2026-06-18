const mongoose = require("mongoose");

const feeTemplateSchema = new mongoose.Schema(
  {
    academicYearId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },

    className: {
      type: String,
      required: true,
      enum: [
        "NURSERY",
        "LKG",
        "UKG",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
      ],
    },

    schoolFee: {
      type: Number,
      required: true,
      min: 0,
    },

    defaultTuitionFee: {
      type: Number,
      required: true,
      min: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

feeTemplateSchema.index(
  {
    academicYearId: 1,
    className: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "FeeTemplate",
  feeTemplateSchema
);