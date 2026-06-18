const mongoose =
  require("mongoose");

const schoolSettingsSchema =
  new mongoose.Schema(
    {
      schoolName: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: "",
      },

      logoUrl: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "SchoolSettings",
    schoolSettingsSchema
  );