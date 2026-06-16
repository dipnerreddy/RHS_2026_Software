const StudentAcademicRecord =
  require(
    "../models/StudentAcademicRecord"
  );

const Student =
  require(
    "../models/Student"
  );

const AcademicYear =
  require(
    "../models/AcademicYear"
  );

const assignStudentToClass =
  async (req, res) => {
    try {
      const {
        studentId,
        academicYearId,
        className,
        section,
        rollNumber,
      } = req.body;

      const student =
        await Student.findById(
          studentId
        );

      if (!student) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "Student not found",
          });
      }

      const academicYear =
        await AcademicYear.findById(
          academicYearId
        );

      if (
        !academicYear
      ) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "Academic year not found",
          });
      }

      const existingRecord =
        await StudentAcademicRecord.findOne(
          {
            studentId,
            academicYearId,
          }
        );

      if (
        existingRecord
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Student already assigned for this academic year",
          });
      }

      const record =
        await StudentAcademicRecord.create(
          {
            studentId,
            academicYearId,
            className,
            section,
            rollNumber,
          }
        );

      res.status(201).json({
        success: true,
        message:
          "Student assigned successfully",
        data: record,
      });
    } catch (error) {
      console.error(
        error
      );

      res.status(500).json({
        success:
          false,
        message:
          "Server Error",
      });
    }
  };

  const getStudentsByClass =
  async (req, res) => {
    try {
      const {
        className,
        section,
      } = req.query;

      const students =
        await StudentAcademicRecord.find(
          {
            className,
            section,
            status:
              "ACTIVE",
          }
        )
          .populate(
            "studentId"
          )
          .sort({
            rollNumber:
              1,
          });

      res.status(200).json({
        success:
          true,
        data:
          students,
      });
    } catch (error) {
      res.status(500).json({
        success:
          false,
        message:
          "Server Error",
      });
    }
  };


  const getAssignedStudents =
  async (req, res) => {
    try {
      const user =
        req.user;

      const assignedClasses =
        user.assignedClasses ||
        [];

      if (
        assignedClasses.length ===
        0
      ) {
        return res.status(200).json({
          success: true,
          data: [],
        });
      }

      const filters =
        assignedClasses.map(
          (
            cls
          ) => ({
            className:
              cls.className,
            section:
              cls.section,
          })
        );

      const students =
        await StudentAcademicRecord.find(
          {
            $or:
              filters,

            status:
              "ACTIVE",
          }
        )
          .populate(
            "studentId"
          )
          .sort({
            className:
              1,

            section:
              1,

            rollNumber:
              1,
          });

      res.status(200).json({
        success:
          true,

        data:
          students,
      });
    } catch (error) {
      console.error(
        error
      );

      res.status(500).json({
        success:
          false,

        message:
          "Server Error",
      });
    }
  };
  

const promoteStudent =
  async (req, res) => {
    try {
      const {
        studentId,
        academicYearId,
        className,
        section,
        rollNumber,
      } = req.body;

      const student =
        await Student.findById(
          studentId
        );

      if (
        !student
      ) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "Student not found",
          });
      }

      if (
        student.status !==
        "ACTIVE"
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Only active students can be promoted",
          });
      }

      const existingPromotion =
        await StudentAcademicRecord.findOne(
          {
            studentId,
            academicYearId,
          }
        );

      if (
        existingPromotion
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Student already promoted for this academic year",
          });
      }
      const currentAcademicRecord =
        await StudentAcademicRecord.findOne(
          {
            studentId,
            status:
              "ACTIVE",
          }
        );

      if (
        currentAcademicRecord
      ) {
        currentAcademicRecord.status =
          "COMPLETED";

        await currentAcademicRecord.save();
      }


      const promotedStudent =
        await StudentAcademicRecord.create(
          {
            studentId,

            academicYearId,

            className,

            section,

            rollNumber,

            status:
              "ACTIVE",
          }
        );

      res.status(201).json({
        success:
          true,

        message:
          "Student promoted successfully",

        data:
          promotedStudent,
      });
    } catch (error) {
      console.error(
        error
      );

      res.status(500).json({
        success:
          false,
        message:
          "Server Error",
      });
    }
  };


module.exports = {
  assignStudentToClass,
  getStudentsByClass,
  getAssignedStudents,
  promoteStudent
};