const StudentFee =
  require(
    "../models/StudentFee"
  );

const calculateTotals =
  (
    schoolFee,
    tuitionFee,
    busFee,
    discountAmount,
    paidAmount
  ) => {

    const totalFee =
      schoolFee +
      tuitionFee +
      busFee -
      discountAmount;

    const balanceAmount =
      totalFee -
      paidAmount;

    return {
      totalFee,
      balanceAmount,
    };
  };

const getAllStudentFees =
  async (req, res) => {
    try {
      const fees =
        await StudentFee.find()
          .populate(
            "studentId",
            "studentName admissionNumber"
          )
          .populate(
            "academicYearId",
            "name"
          )
          .sort({
            createdAt:
              -1,
          });

      res.status(200).json({
        success:
          true,

        data:
          fees,
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

const getStudentFee =
  async (req, res) => {
    try {
      const fee =
        await StudentFee.findOne(
          {
            studentId:
              req.params.studentId,
          }
        )
          .populate(
            "studentId"
          )
          .populate(
            "academicYearId"
          );

      if (!fee) {
        return res
          .status(404)
          .json({
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
      res.status(500).json({
        success:
          false,

        message:
          "Server Error",
      });
    }
  };

const updateBusDetails =
  async (req, res) => {
    try {
      const {
        usesBus,
        busLocation,
        busFee,
      } = req.body;

      const fee =
        await StudentFee.findById(
          req.params.id
        );

      if (!fee) {
        return res
          .status(404)
          .json({
            success:
              false,

            message:
              "Fee record not found",
          });
      }

      fee.usesBus =
        usesBus;

      fee.busLocation =
        usesBus
          ? busLocation
          : null;

      fee.busFee =
        usesBus
          ? busFee
          : 0;

      const totals =
        calculateTotals(
          fee.schoolFee,
          fee.tuitionFee,
          fee.busFee,
          fee.discountAmount,
          fee.paidAmount
        );

      fee.totalFee =
        totals.totalFee;

      fee.balanceAmount =
        totals.balanceAmount;

      await fee.save();

      res.status(200).json({
        success:
          true,

        message:
          "Bus details updated successfully",

        data:
          fee,
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

const updateTuitionDetails =
  async (req, res) => {
    try {
      const {
        usesTuition,
        tuitionFee,
      } = req.body;

      const fee =
        await StudentFee.findById(
          req.params.id
        );

      if (!fee) {
        return res
          .status(404)
          .json({
            success:
              false,

            message:
              "Fee record not found",
          });
      }

      fee.usesTuition =
        usesTuition;

      fee.tuitionFee =
        usesTuition
          ? tuitionFee
          : 0;

      const totals =
        calculateTotals(
          fee.schoolFee,
          fee.tuitionFee,
          fee.busFee,
          fee.discountAmount,
          fee.paidAmount
        );

      fee.totalFee =
        totals.totalFee;

      fee.balanceAmount =
        totals.balanceAmount;

      await fee.save();

      res.status(200).json({
        success:
          true,

        message:
          "Tuition details updated successfully",

        data:
          fee,
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
  getAllStudentFees,
  getStudentFee,
  updateBusDetails,
  updateTuitionDetails,
};