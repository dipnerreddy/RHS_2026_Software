const Attendance =
  require(
    "../models/Attendance"
  );

const StudentAcademicRecord =
  require(
    "../models/StudentAcademicRecord"
  );

const AcademicYear =
  require(
    "../models/AcademicYear"
  );

const markAttendance =
  async (req, res) => {
    try {
      const user =
        req.user;

      const {
        className,
        section,
        attendance,
      } = req.body;

      const assignedClass =
        user.assignedClasses.find(
          (cls) =>
            cls.className ===
              className &&
            cls.section ===
              section
        );

      if (
        !assignedClass &&
        user.role !==
          "HOD" &&
        user.role !==
          "SUPER_ADMIN"
      ) {
        return res
          .status(403)
          .json({
            success:
              false,
            message:
              "You are not assigned to this class",
          });
      }

      const activeYear =
        await AcademicYear.findOne(
          {
            isActive:
              true,
          }
        );

      if (
        !activeYear
      ) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "No active academic year found",
          });
      }

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const attendanceData =
        attendance.map(
          (
            item
          ) => ({
            studentId:
              item.studentId,

            academicYearId:
              activeYear._id,

            className,

            section,

            attendanceDate:
              today,

            status:
              item.status,

            markedBy:
              user._id,
          })
        );

      await Attendance.insertMany(
        attendanceData,
        {
          ordered:
            true,
        }
      );

      res.status(201).json({
        success:
          true,
        message:
          "Attendance marked successfully",
      });
    } catch (error) {
      console.error(
        error
      );

      if (
        error.code ===
        11000
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Attendance already marked for today",
          });
      }

      res.status(500).json({
        success:
          false,
        message:
          "Server Error",
      });
    }
  };

const getAttendanceHistory =
  async (req, res) => {
    try {
      const user =
        req.user;

      const {
        className,
        section,
        date,
      } = req.query;

      // Validate teacher access
      const assignedClass =
        user.assignedClasses.find(
          (cls) =>
            cls.className ===
              className &&
            cls.section ===
              section
        );

      if (
        !assignedClass &&
        user.role !==
          "HOD" &&
        user.role !==
          "SUPER_ADMIN"
      ) {
        return res
          .status(403)
          .json({
            success:
              false,
            message:
              "You are not assigned to this class",
          });
      }

      // Get full class student list
      const classStudents =
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

      // Get attendance for date
      const attendanceRecords =
        await Attendance.find(
          {
            className,
            section,
            attendanceDate:
              date,
          }
        );

      // Create lookup map
      const attendanceMap =
        {};

      attendanceRecords.forEach(
        (
          record
        ) => {
          attendanceMap[
            record.studentId.toString()
          ] =
            record.status;
        }
      );

      // Merge students + attendance
      const mergedData =
        classStudents.map(
          (
            student
          ) => ({
            studentId:
              student
                .studentId
                ._id,

            studentName:
              student
                .studentId
                .studentName,

            admissionNumber:
              student
                .studentId
                .admissionNumber,

            rollNumber:
              student.rollNumber,

            className:
              student.className,

            section:
              student.section,

            status:
              attendanceMap[
                student.studentId._id.toString()
              ] ||
              "NOT_MARKED",
          })
        );

      res.status(200).json({
        success:
          true,

        data:
          mergedData,
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
  markAttendance,
  getAttendanceHistory,
};