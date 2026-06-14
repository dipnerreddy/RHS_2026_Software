const Student =
  require("../models/Student");

const generateAdmissionNumber =
  require(
    "../utils/generateAdmissionNumber"
  );

const createStudent =
  async (req, res) => {
    try {
      const {
        studentName,
        fatherName,
        motherName,
        primaryPhone,
        secondaryPhone,
        gender,
        dateOfBirth,
        admissionDate,
        address,
      } = req.body;

      const admissionNumber =
        await generateAdmissionNumber();

      const student =
        await Student.create({
          admissionNumber,

          studentName,
          fatherName,
          motherName,

          primaryPhone,
          secondaryPhone,

          gender,

          dateOfBirth,
          admissionDate,

          address,
        });

      res.status(201).json({
        success: true,
        message:
          "Student created successfully",
        data: student,
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

const getStudents =
  async (req, res) => {
    try {
      const students =
        await Student.find().sort(
          {
            createdAt:
              -1,
          }
        );

      res.status(200).json({
        success: true,
        data:
          students,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const searchStudents =
  async (req, res) => {
    try {
      const {
        search,
      } = req.query;

      const students =
        await Student.find({
          $or: [
            {
              studentName:
                {
                  $regex:
                    search,
                  $options:
                    "i",
                },
            },

            {
              admissionNumber:
                {
                  $regex:
                    search,
                  $options:
                    "i",
                },
            },

            {
              primaryPhone:
                {
                  $regex:
                    search,
                  $options:
                    "i",
                },
            },
          ],
        });

      res.status(200).json({
        success: true,
        data:
          students,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  createStudent,
  getStudents,
  searchStudents,
};