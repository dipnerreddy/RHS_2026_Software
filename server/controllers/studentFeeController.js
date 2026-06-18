const StudentFee =
  require(
    "../models/StudentFee"
  );

  const createBillingLog =
  require(
    "../services/createBillingLog"
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
            success: false,
            message:
              "Fee record not found",
          });
      }

      // OLD VALUES FOR AUDIT LOG
      const oldValue = {
        usesBus:
          fee.usesBus,

        busLocation:
          fee.busLocation,

        busFee:
          fee.busFee,
      };

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

      await createBillingLog({
        studentFeeId:
          fee._id,

        studentId:
          fee.studentId,

        action:
          "BUS_UPDATED",

        oldValue,

        newValue: {
          usesBus:
            fee.usesBus,

          busLocation:
            fee.busLocation,

          busFee:
            fee.busFee,
        },

        performedBy:
          req.user.userId ||
          req.user._id,
      });

      res.status(200).json({
        success: true,

        message:
          "Bus details updated successfully",

        data: fee,
      });
    } catch (error) {
      console.error(
        "BUS UPDATE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
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
            success: false,
            message:
              "Fee record not found",
          });
      }

      // OLD VALUES FOR AUDIT LOG
      const oldValue = {
        usesTuition:
          fee.usesTuition,

        tuitionFee:
          fee.tuitionFee,
      };

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

      await createBillingLog({
        studentFeeId:
          fee._id,

        studentId:
          fee.studentId,

        action:
          "TUITION_UPDATED",

        oldValue,

        newValue: {
          usesTuition:
            fee.usesTuition,

          tuitionFee:
            fee.tuitionFee,
        },

        performedBy:
          req.user.userId ||
          req.user._id,
      });

      res.status(200).json({
        success: true,

        message:
          "Tuition details updated successfully",

        data: fee,
      });
    } catch (error) {
      console.error(
        "TUITION UPDATE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  const BillingLog =
  require(
    "../models/BillingLog"
  );

const getBillingLogs =
  async (req, res) => {
    try {

      const logs =
        await BillingLog.find()
          .populate(
            "studentId",
            "studentName admissionNumber"
          )
          .populate(
            "performedBy",
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
          logs,
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
  getBillingLogs,
  updateBusDetails,
  updateTuitionDetails,
};