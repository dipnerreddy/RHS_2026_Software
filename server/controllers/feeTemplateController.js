const FeeTemplate = require(
  "../models/FeeTemplate"
);

const createFeeTemplate = async (
  req,
  res
) => {
  try {
    const {
      academicYearId,
      className,
      schoolFee,
      defaultTuitionFee,
    } = req.body;

    const existing =
      await FeeTemplate.findOne({
        academicYearId,
        className,
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Fee template already exists",
      });
    }

    const template =
      await FeeTemplate.create({
        academicYearId,
        className,
        schoolFee,
        defaultTuitionFee,
        createdBy:
          req.user.userId ||
          req.user._id,
      });

    res.status(201).json({
      success: true,
      message:
        "Fee template created successfully",
      data: template,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getFeeTemplates = async (
  req,
  res
) => {
  try {
    const templates =
      await FeeTemplate.find()
        .populate(
          "academicYearId"
        )
        .populate(
          "createdBy",
          "name email"
        )
        .sort({
          className: 1,
        });

    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createFeeTemplate,
  getFeeTemplates,
};