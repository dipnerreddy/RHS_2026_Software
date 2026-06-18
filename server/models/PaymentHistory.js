const mongoose =
  require("mongoose");

const paymentHistorySchema =
  new mongoose.Schema(
    {
      studentFeeId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref:
          "StudentFee",
        required:
          true,
      },

      amount: {
        type:
          Number,
        required:
          true,
        min: 1,
      },

      paymentMethod: {
        type:
          String,
        enum: [
          "CASH",
          "UPI",
          "BANK_TRANSFER",
          "CHEQUE",
          "CARD",
        ],
        required:
          true,
      },

      referenceNumber: {
        type:
          String,
        default:
          null,
      },

      collectedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref:
          "User",
        required:
          true,
      },

      paymentDate: {
        type:
          Date,
        default:
          Date.now,
      },
    },
    {
      timestamps:
        true,
    }
  );

module.exports =
  mongoose.model(
    "PaymentHistory",
    paymentHistorySchema
  );