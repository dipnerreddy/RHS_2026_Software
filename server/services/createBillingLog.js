const BillingLog =
  require(
    "../models/BillingLog"
  );

const createBillingLog =
  async ({
    studentFeeId,
    studentId,
    action,
    oldValue,
    newValue,
    performedBy,
  }) => {

    await BillingLog.create({
      studentFeeId,
      studentId,
      action,
      oldValue,
      newValue,
      performedBy,
    });
  };

module.exports =
  createBillingLog;