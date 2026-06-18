const PDFDocument =
  require("pdfkit");

const PaymentHistory =
  require(
    "../models/PaymentHistory"
  );

const SchoolSettings =
  require(
    "../models/SchoolSettings"
  );

const generateReceiptPdf =
  async (req, res) => {
    try {

      const payment =
        await PaymentHistory.findOne({
          receiptNumber:
            req.params.receiptNumber,
        })
          .populate({
            path:
              "studentFeeId",

            populate: [
              {
                path:
                  "studentId",
              },
              {
                path:
                  "academicYearId",
              },
            ],
          })
          .populate(
            "collectedBy",
            "name"
          );

      if (!payment) {
        return res.status(404).json({
          success: false,
          message:
            "Receipt not found",
        });
      }

      const settings =
        await SchoolSettings.findOne();

      const doc =
        new PDFDocument({
          margin: 50,
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `inline; filename=${payment.receiptNumber}.pdf`
      );

      doc.pipe(res);

      doc
        .fontSize(20)
        .text(
          settings?.schoolName ||
          "Radiant High School",
          {
            align:
              "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(11)
        .text(
          settings?.address ||
          ""
        );

      doc.text(
        settings?.phone ||
        ""
      );

      doc.moveDown();

      doc.text(
        `Receipt No: ${payment.receiptNumber}`
      );

      doc.text(
        `Receipt Date: ${payment.paymentDate.toDateString()}`
      );

      doc.moveDown();

      doc.text(
        `Student Name: ${payment.studentFeeId.studentId.studentName}`
      );

      doc.text(
        `Admission No: ${payment.studentFeeId.studentId.admissionNumber}`
      );

      doc.text(
        `Academic Year: ${payment.studentFeeId.academicYearId.name}`
      );

      doc.moveDown();

      doc.text(
        `Amount Paid: ₹${payment.amount}`
      );

      doc.text(
        `Payment Method: ${payment.paymentMethod}`
      );

      doc.text(
        `Reference Number: ${
          payment.referenceNumber ||
          "-"
        }`
      );

      doc.moveDown();

      doc.text(
        `Collected By: ${payment.collectedBy.name}`
      );

      doc.moveDown(2);

      doc.text(
        "Thank You",
        {
          align:
            "center",
        }
      );

      doc.end();

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  generateReceiptPdf,
};