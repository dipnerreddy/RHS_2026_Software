const mongoose =
  require("mongoose");

const billingLogSchema =
  new mongoose.Schema(
    {
      studentFeeId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "StudentFee",
        required: true,
      },

      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },

      action: {
        type: String,
        required: true,
        enum: [
            "BUS_UPDATED",
            "TUITION_UPDATED",

            "DISCOUNT_REQUESTED",
            "DISCOUNT_APPROVED",
            "DISCOUNT_REJECTED",

            "PAYMENT_COLLECTED",
            "FEE_UPDATED",
        ],
      },

        oldValue: {
        type:
            mongoose.Schema.Types.Mixed,
        default: {},
        },

        newValue: {
        type:
            mongoose.Schema.Types.Mixed,
        default: {},
        },

      performedBy: {
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

module.exports =
  mongoose.model(
    "BillingLog",
    billingLogSchema
  );