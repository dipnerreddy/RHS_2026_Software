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
            success:
              false,
            message:
              "Student fee record not found",
          });
      }

      if (
        amount >
        fee.balanceAmount
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Payment cannot exceed balance amount",
          });
      }

      const oldPaidAmount =
        fee.paidAmount;

      await PaymentHistory.create({
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

      if (
        fee.balanceAmount ===
        0
      ) {
        fee.status =
          "PAID";
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
        },

        newValue: {
          paidAmount:
            fee.paidAmount,
        },

        performedBy:
          req.user.userId ||
          req.user._id,
      });

      res.status(200).json({
        success:
          true,

        message:
          "Payment collected successfully",

        data: {
          paidAmount:
            fee.paidAmount,

          balanceAmount:
            fee.balanceAmount,

          dueDate:
            fee.dueDate,
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
  collectPayment,
};