const StudentFee =
  require(
    "../models/StudentFee"
  );

const getOutstandingFees =
  async (req, res) => {
    try {

      const fees =
        await StudentFee.find({
          balanceAmount: {
            $gt: 0,
          },
        })
          .populate(
            "studentId",
            "studentName admissionNumber"
          )
          .populate(
            "academicYearId",
            "name"
          )
          .sort({
            dueDate:
              1,
          });

      res.status(200).json({
        success:
          true,

        count:
          fees.length,

        data:
          fees,
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

const getStudentOutstandingFee =
  async (req, res) => {
    try {

      const fee =
        await StudentFee.findOne({
          studentId:
            req.params.studentId,
        })
          .populate(
            "studentId",
            "studentName admissionNumber"
          )
          .populate(
            "academicYearId",
            "name"
          );

      if (!fee) {
        return res.status(404).json({
          success:
            false,

          message:
            "Fee record not found",
        });
      }

      res.status(200).json({
        success:
          true,

        data:
          fee,
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
  getOutstandingFees,
  getStudentOutstandingFee,
};