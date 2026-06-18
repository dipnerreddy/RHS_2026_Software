const StudentFee =
  require(
    "../models/StudentFee"
  );

const {
  exportCSV,
  exportExcel,
} = require(
  "../services/exportService"
);

const exportOutstandingFeesCSV =
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
          );

      const data =
        fees.map(
          (
            fee
          ) => ({
            Student:
              fee.studentId
                ?.studentName,

            AdmissionNumber:
              fee.studentId
                ?.admissionNumber,

            TotalFee:
              fee.totalFee,

            PaidAmount:
              fee.paidAmount,

            BalanceAmount:
              fee.balanceAmount,

            DueDate:
              fee.dueDate,
          })
        );

      const csv =
        exportCSV(
          data,
          Object.keys(
            data[0] || {}
          )
        );

      res.header(
        "Content-Type",
        "text/csv"
      );

      res.attachment(
        "outstanding-fees.csv"
      );

      return res.send(
        csv
      );

    } catch (error) {

      res.status(500).json({
        success:
          false,
        message:
          "Server Error",
      });
    }
  };

const exportOutstandingFeesExcel =
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
          );

      const data =
        fees.map(
          (
            fee
          ) => ({
            Student:
              fee.studentId
                ?.studentName,

            AdmissionNumber:
              fee.studentId
                ?.admissionNumber,

            TotalFee:
              fee.totalFee,

            PaidAmount:
              fee.paidAmount,

            BalanceAmount:
              fee.balanceAmount,
          })
        );

      const workbook =
        await exportExcel(
          data,
          "Outstanding Fees"
        );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=outstanding-fees.xlsx"
      );

      await workbook.xlsx.write(
        res
      );

      res.end();

    } catch (error) {

      res.status(500).json({
        success:
          false,
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  exportOutstandingFeesCSV,
  exportOutstandingFeesExcel,
};