const DiscountRequest =
  require(
    "../models/DiscountRequest"
  );

const StudentFee =
  require(
    "../models/StudentFee"
  );

  const createBillingLog =
  require(
    "../services/createBillingLog"
  );

const createDiscountRequest =
  async (req, res) => {
    try {

      const {
        studentFeeId,
        requestedAmount,
        reason,
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

      const existing =
        await DiscountRequest.findOne(
          {
            studentFeeId,

            status:
              "PENDING",
          }
        );

      if (
        existing
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Pending discount request already exists",
          });
      }

      const request =
        await DiscountRequest.create(
          {
            studentFeeId,

            requestedAmount,

            reason,

            requestedBy:
              req.user.userId ||
              req.user._id,
          }
        );

      res.status(201).json({
        success:
          true,

        message:
          "Discount request submitted successfully",

        data:
          request,
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

const getDiscountRequests =
  async (req, res) => {
    try {

      const requests =
        await DiscountRequest.find()
          .populate(
            "studentFeeId"
          )
          .populate(
            "requestedBy",
            "name role"
          )
          .sort({
            createdAt:
              -1,
          });

      res.status(200).json({
        success:
          true,

        data:
          requests,
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

const approveDiscountRequest =
  async (req, res) => {
    try {

      const {
        approvedAmount
      } = req.body;

      const request =
        await DiscountRequest.findById(
          req.params.id
        );

      if (!request) {
        return res.status(404).json({
          success: false,
          message:
            "Discount request not found",
        });
      }

      if (
        request.status !==
        "PENDING"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Request already processed",
        });
      }

      const fee =
        await StudentFee.findById(
          request.studentFeeId
        );

      fee.discountAmount =
        approvedAmount;

      fee.totalFee =
        fee.schoolFee +
        fee.tuitionFee +
        fee.busFee -
        approvedAmount;

      fee.balanceAmount =
        fee.totalFee -
        fee.paidAmount;

      await fee.save();

      request.status =
        "APPROVED";

      request.approvedAmount =
        approvedAmount;

      request.approvedBy =
        req.user.userId ||
        req.user._id;

      request.approvedAt =
        new Date();

      await request.save();

      await createBillingLog({
        studentFeeId:
          fee._id,

        studentId:
          fee.studentId,

        action:
          "DISCOUNT_APPROVED",

        oldValue: {
          discountAmount: 0,
        },

        newValue: {
          discountAmount:
            approvedAmount,
        },

        performedBy:
          req.user.userId ||
          req.user._id,
      });

      res.status(200).json({
        success: true,
        message:
          "Discount approved successfully",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };

  const rejectDiscountRequest =
  async (req, res) => {
    try {

      const {
        rejectionReason
      } = req.body;

      const request =
        await DiscountRequest.findById(
          req.params.id
        );

      if (!request) {
        return res.status(404).json({
          success: false,
          message:
            "Discount request not found",
        });
      }

      if (
        request.status !==
        "PENDING"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Request already processed",
        });
      }

      request.status =
        "REJECTED";

      request.rejectionReason =
        rejectionReason;

      request.approvedBy =
        req.user.userId ||
        req.user._id;

      request.approvedAt =
        new Date();

      await request.save();

      res.status(200).json({
        success: true,
        message:
          "Discount rejected successfully",
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
  createDiscountRequest,
  getDiscountRequests,
  approveDiscountRequest,
  rejectDiscountRequest,
};