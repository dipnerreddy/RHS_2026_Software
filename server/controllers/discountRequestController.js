const DiscountRequest =
  require(
    "../models/DiscountRequest"
  );

const StudentFee =
  require(
    "../models/StudentFee"
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

module.exports = {
  createDiscountRequest,
  getDiscountRequests,
};