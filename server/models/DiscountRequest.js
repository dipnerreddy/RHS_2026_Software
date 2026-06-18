const mongoose =
  require("mongoose");

const discountRequestSchema =
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

      requestedAmount: {
        type:
          Number,
        required:
          true,
        min: 1,
      },

      reason: {
        type:
          String,
        required:
          true,
        trim:
          true,
      },

      requestedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref:
          "User",
        required:
          true,
      },

      status: {
        type:
          String,
        enum: [
          "PENDING",
          "APPROVED",
          "REJECTED",
        ],
        default:
          "PENDING",
      },

      approvedAmount: {
        type:
          Number,
        default:
          0,
      },

      approvedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref:
          "User",
        default:
          null,
      },

      approvedAt: {
        type:
          Date,
        default:
          null,
      },

      rejectionReason: {
        type:
          String,
        default:
          null,
      },
    },
    {
      timestamps:
        true,
    }
  );

module.exports =
  mongoose.model(
    "DiscountRequest",
    discountRequestSchema
  );