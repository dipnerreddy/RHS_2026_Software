const AcademicYear = require("../models/AcademicYear");


// Create Academic Year
const createAcademicYear = async (
  req,
  res
) => {
  try {
    const {
      name,
      startDate,
      endDate,
      isActive,
    } = req.body;

    // Check duplicate year
    const existingYear =
      await AcademicYear.findOne({
        name,
      });

    if (existingYear) {
      return res.status(400).json({
        success: false,
        message:
          "Academic year already exists",
      });
    }

    // If new year is active,
    // deactivate old active year
    if (isActive) {
      await AcademicYear.updateMany(
        {},
        {
          isActive: false,
        }
      );
    }

    // Create year
    const academicYear =
      await AcademicYear.create({
        name,
        startDate,
        endDate,
        isActive:
          isActive || false,
      });

    res.status(201).json({
      success: true,
      message:
        "Academic year created successfully",
      data: academicYear,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};


// Get All Academic Years
const getAcademicYears =
  async (req, res) => {
    try {
      const years =
        await AcademicYear.find().sort(
          {
            createdAt:
              -1,
          }
        );

      res.status(200).json({
        success: true,
        data: years,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };


// Get Active Academic Year
const getActiveAcademicYear =
  async (req, res) => {
    try {
      const activeYear =
        await AcademicYear.findOne(
          {
            isActive: true,
          }
        );

      res.status(200).json({
        success: true,
        data: activeYear,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };


// Export everything
module.exports = {
  createAcademicYear,
  getAcademicYears,
  getActiveAcademicYear,
};