const StudentFee =
  require(
    "../models/StudentFee"
  );

const PaymentHistory =
  require(
    "../models/PaymentHistory"
  );

const {
  exportCSV,
  exportExcel,
} = require(
  "../services/exportService"
);

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const buildStudentFeeExportData =
  (fees) =>
    fees.map((fee) => ({
      Student:
        fee.studentId?.studentName,

      AdmissionNumber:
        fee.studentId?.admissionNumber,

      TotalFee:
        fee.totalFee,

      PaidAmount:
        fee.paidAmount,

      BalanceAmount:
        fee.balanceAmount,

      Status:
        fee.status,

      DueDate:
        fee.dueDate,
    }));

const buildCollectionExportData =
  (payments) =>
    payments.map(
      (
        payment
      ) => ({
        ReceiptNumber:
          payment.receiptNumber,

        Amount:
          payment.amount,

        PaymentMethod:
          payment.paymentMethod,

        ReferenceNumber:
          payment.referenceNumber,

        PaymentDate:
          payment.paymentDate,
      })
    );

const exportStudentFeeData =
  async (
    res,
    filter,
    fileName,
    format
  ) => {

    const fees =
      await StudentFee.find(
        filter
      ).populate(
        "studentId",
        "studentName admissionNumber"
      );

    const data =
      buildStudentFeeExportData(
        fees
      );

    if (
      format === "csv"
    ) {

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
        `${fileName}.csv`
      );

      return res.send(
        csv
      );
    }

    const workbook =
      await exportExcel(
        data,
        fileName
      );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.xlsx`
    );

    await workbook.xlsx.write(
      res
    );

    res.end();
  };

/*
|--------------------------------------------------------------------------
| Outstanding Fees
|--------------------------------------------------------------------------
*/

const exportOutstandingFeesCSV =
  async (req, res) => {
    try {

      await exportStudentFeeData(
        res,
        {
          balanceAmount:
            { $gt: 0 },
        },
        "outstanding-fees",
        "csv"
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const exportOutstandingFeesExcel =
  async (req, res) => {
    try {

      await exportStudentFeeData(
        res,
        {
          balanceAmount:
            { $gt: 0 },
        },
        "outstanding-fees",
        "excel"
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

/*
|--------------------------------------------------------------------------
| Paid Students
|--------------------------------------------------------------------------
*/

const exportPaidStudentsCSV =
  async (req, res) => {
    try {

      await exportStudentFeeData(
        res,
        {
          status:
            "PAID",
        },
        "paid-students",
        "csv"
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const exportPaidStudentsExcel =
  async (req, res) => {
    try {

      await exportStudentFeeData(
        res,
        {
          status:
            "PAID",
        },
        "paid-students",
        "excel"
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

/*
|--------------------------------------------------------------------------
| Partial Students
|--------------------------------------------------------------------------
*/


const exportPendingStudentsCSV =
  async (req, res) => {
    try {

      await exportStudentFeeData(
        res,
        {
          status:
            "PENDING",
        },
        "pending-students",
        "csv"
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const exportPendingStudentsExcel =
  async (req, res) => {
    try {

      await exportStudentFeeData(
        res,
        {
          status:
            "PENDING",
        },
        "pending-students",
        "excel"
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };


  const exportCollectionSummaryCSV =
  async (req, res) => {
    try {

      const payments =
        await PaymentHistory.find();

      const data =
        buildCollectionExportData(
          payments
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
        "collection-summary.csv"
      );

      return res.send(
        csv
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const exportCollectionSummaryExcel =
  async (req, res) => {
    try {

      const payments =
        await PaymentHistory.find();

      const data =
        buildCollectionExportData(
          payments
        );

      const workbook =
        await exportExcel(
          data,
          "Collection Summary"
        );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=collection-summary.xlsx"
      );

      await workbook.xlsx.write(
        res
      );

      res.end();

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const exportPartiallyPaidStudentsCSV =
  async (req, res) => {
    try {

      await exportStudentFeeData(
        res,
        {
          status:
            "PARTIALLY_PAID",
        },
        "partially-paid-students",
        "csv"
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const exportPartiallyPaidStudentsExcel =
  async (req, res) => {
    try {

      await exportStudentFeeData(
        res,
        {
          status:
            "PARTIALLY_PAID",
        },
        "partially-paid-students",
        "excel"
      );

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };


module.exports = {
  exportOutstandingFeesCSV,
  exportOutstandingFeesExcel,

  exportPaidStudentsCSV,
  exportPaidStudentsExcel,

  exportPartiallyPaidStudentsCSV,
  exportPartiallyPaidStudentsExcel,

  exportPendingStudentsCSV,
  exportPendingStudentsExcel,

  exportCollectionSummaryCSV,
  exportCollectionSummaryExcel,
};

