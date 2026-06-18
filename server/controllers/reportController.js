const StudentFee =
  require(
    "../models/StudentFee"
  );

const PaymentHistory =
  require(
    "../models/PaymentHistory"
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

const getPaidStudents =
  async (req, res) => {
    try {

      const students =
        await StudentFee.find({
          status: "PAID",
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
            updatedAt: -1,
          });

      res.status(200).json({
        success: true,
        count: students.length,
        data: students,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

const getPartiallyPaidStudents =
  async (req, res) => {
    try {

      const students =
        await StudentFee.find({
          status:
            "PARTIALLY_PAID",
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
            updatedAt: -1,
          });

      res.status(200).json({
        success: true,
        count: students.length,
        data: students,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

const getPendingStudents =
  async (req, res) => {
    try {

      const students =
        await StudentFee.find({
          status:
            "PENDING",
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
            dueDate: 1,
          });

      res.status(200).json({
        success: true,
        count: students.length,
        data: students,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };


  const getCollectionSummary =
  async (req, res) => {
    try {

      const {
        from,
        to,
      } = req.query;

      const filter = {};

      if (
        from &&
        to
      ) {
        filter.paymentDate = {
          $gte:
            new Date(from),

          $lte:
            new Date(
              `${to}T23:59:59.999Z`
            ),
        };
      }

      const payments =
        await PaymentHistory.find(
          filter
        );

      const totalAmount =
        payments.reduce(
          (
            sum,
            payment
          ) =>
            sum +
            payment.amount,
          0
        );

      const totalReceipts =
        payments.length;

      const averageCollection =
        totalReceipts > 0
          ? Number(
              (
                totalAmount /
                totalReceipts
              ).toFixed(2)
            )
          : 0;

      const paymentMethodBreakdown =
        {};

      payments.forEach(
        (
          payment
        ) => {

          const method =
            payment.paymentMethod;

          paymentMethodBreakdown[
            method
          ] =
            (
              paymentMethodBreakdown[
                method
              ] || 0
            ) +
            payment.amount;
        }
      );

      res.status(200).json({
        success:
          true,

        data: {
          totalAmount,

          totalReceipts,

          averageCollection,

          paymentMethodBreakdown,
        },
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
  getPaidStudents,
  getPartiallyPaidStudents,
  getPendingStudents,
  getCollectionSummary,
};