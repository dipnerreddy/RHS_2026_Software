const mongoose =
  require("mongoose");

const receiptCounterSchema =
  new mongoose.Schema(
    {
      academicYearId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref:
          "AcademicYear",

        required:
          true,

        unique:
          true,
      },

      sequence: {
        type:
          Number,

        default:
          0,
      },
    },
    {
      timestamps:
        true,
    }
  );

module.exports =
  mongoose.model(
    "ReceiptCounter",
    receiptCounterSchema
  );