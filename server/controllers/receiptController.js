const PaymentHistory =
  require(
    "../models/PaymentHistory"
  );

const getAllReceipts =
  async (req, res) => {
    try {

      const receipts =
        await PaymentHistory.find()
          .populate(
            "collectedBy",
            "name role"
          )
          .populate(
            "studentFeeId"
          )
          .sort({
            paymentDate:
              -1,
          });

      res.status(200).json({
        success:
          true,

        data:
          receipts,
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

const getReceiptByNumber =
  async (req, res) => {
    try {

      const receipt =
        await PaymentHistory.findOne(
          {
            receiptNumber:
              req.params.receiptNumber,
          }
        )
          .populate(
            "collectedBy",
            "name role"
          )
          .populate(
            "studentFeeId"
          );

      if (!receipt) {
        return res.status(404).json({
          success:
            false,

          message:
            "Receipt not found",
        });
      }

      res.status(200).json({
        success:
          true,

        data:
          receipt,
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

const getStudentReceipts =
  async (req, res) => {
    try {

      const receipts =
        await PaymentHistory.find(
          {
            studentFeeId:
              req.params.studentFeeId,
          }
        )
          .populate(
            "collectedBy",
            "name role"
          )
          .sort({
            paymentDate:
              -1,
          });

      res.status(200).json({
        success:
          true,

        data:
          receipts,
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

const getPrintableReceipt =
  async (req, res) => {
    try {

      const receipt =
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
            "name role"
          );

      if (!receipt) {
        return res.status(404).json({
          success:
            false,

          message:
            "Receipt not found",
        });
      }

      const printableReceipt =
        {
          schoolName:
            "Radiant High School",

          receiptNumber:
            receipt.receiptNumber,

          receiptDate:
            receipt.paymentDate,

          studentName:
            receipt
              .studentFeeId
              .studentId
              .studentName,

          admissionNumber:
            receipt
              .studentFeeId
              .studentId
              .admissionNumber,

          academicYear:
            receipt
              .studentFeeId
              .academicYearId
              .name,

          amount:
            receipt.amount,

          paymentMethod:
            receipt.paymentMethod,

          referenceNumber:
            receipt.referenceNumber,

          collectedBy:
            receipt
              .collectedBy
              .name,
        };

      res.status(200).json({
        success:
          true,

        data:
          printableReceipt,
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
  getAllReceipts,
  getReceiptByNumber,
  getStudentReceipts,
  getPrintableReceipt,
};