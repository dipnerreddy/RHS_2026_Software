const StudentFee =
  require(
    "../models/StudentFee"
  );

const PaymentHistory =
  require(
    "../models/PaymentHistory"
  );

const createBillingLog =
  require(
    "../services/createBillingLog"
  );

const generateReceiptNumber =
  require(
    "../utils/generateReceiptNumber"
  );

const collectPayment =
  async (req, res) => {
    try {

      const {
        studentFeeId,
        amount,
        paymentMethod,
        referenceNumber,
      } = req.body;

      const fee =
        await StudentFee.findById(
          studentFeeId
        );

      if (!fee) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Student fee record not found",
          });
      }

      if (
        amount <= 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Payment amount must be greater than zero",
          });
      }

      if (
        amount >
        fee.balanceAmount
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Payment cannot exceed balance amount",
          });
      }

      const oldPaidAmount =
        fee.paidAmount;

      const oldBalanceAmount =
        fee.balanceAmount;

      const oldStatus =
        fee.status;

      const receiptNumber =
        await generateReceiptNumber(
          fee.academicYearId
        );

      await PaymentHistory.create({
        receiptNumber,

        studentFeeId,

        amount,

        paymentMethod,

        referenceNumber,

        collectedBy:
          req.user.userId ||
          req.user._id,
      });

      fee.paidAmount =
        fee.paidAmount +
        amount;

      fee.balanceAmount =
        fee.totalFee -
        fee.paidAmount;

      fee.lastPaymentDate =
        new Date();

      const nextDueDate =
        new Date();

      nextDueDate.setDate(
        nextDueDate.getDate() +
          60
      );

      fee.dueDate =
        nextDueDate;

      /*
       * STATUS LOGIC
       */

      if (
        fee.balanceAmount <= 0
      ) {

        fee.status =
          "PAID";

      } else if (
        fee.paidAmount > 0
      ) {

        fee.status =
          "PARTIALLY_PAID";

      } else {

        fee.status =
          "PENDING";
      }

      await fee.save();

      await createBillingLog({
        studentFeeId:
          fee._id,

        studentId:
          fee.studentId,

        action:
          "PAYMENT_COLLECTED",

        oldValue: {
          paidAmount:
            oldPaidAmount,

          balanceAmount:
            oldBalanceAmount,

          status:
            oldStatus,
        },

        newValue: {
          paidAmount:
            fee.paidAmount,

          balanceAmount:
            fee.balanceAmount,

          status:
            fee.status,
        },

        performedBy:
          req.user.userId ||
          req.user._id,
      });

      res.status(200).json({
        success: true,

        message:
          "Payment collected successfully",

        receiptNumber,

        data: {
          paidAmount:
            fee.paidAmount,

          balanceAmount:
            fee.balanceAmount,

          status:
            fee.status,

          dueDate:
            fee.dueDate,
        },
      });

    } catch (error) {

      console.error(
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const getAllPayments =
  async (req, res) => {
    try {

      const payments =
        await PaymentHistory.find()
          .populate(
            "studentFeeId"
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
        success: true,
        data: payments,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const getStudentPayments =
  async (req, res) => {
    try {

      const payments =
        await PaymentHistory.find({
          studentFeeId:
            req.params.studentFeeId,
        })
          .populate(
            "collectedBy",
            "name role"
          )
          .sort({
            paymentDate:
              -1,
          });

      res.status(200).json({
        success: true,
        data: payments,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

const getPaymentById =
  async (req, res) => {
    try {

      const payment =
        await PaymentHistory.findById(
          req.params.paymentId
        )
          .populate(
            "studentFeeId"
          )
          .populate(
            "collectedBy",
            "name role"
          );

      if (!payment) {
        return res.status(404).json({
          success: false,
          message:
            "Payment not found",
        });
      }

      res.status(200).json({
        success: true,
        data: payment,
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
  collectPayment,
  getAllPayments,
  getStudentPayments,
  getPaymentById,
};