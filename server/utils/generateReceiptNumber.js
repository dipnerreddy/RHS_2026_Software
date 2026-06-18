const ReceiptCounter =
  require(
    "../models/ReceiptCounter"
  );

const AcademicYear =
  require(
    "../models/AcademicYear"
  );

const generateReceiptNumber =
  async (
    academicYearId
  ) => {

    const academicYear =
      await AcademicYear.findById(
        academicYearId
      );

    if (
      !academicYear
    ) {
      throw new Error(
        "Academic year not found"
      );
    }

    let counter =
      await ReceiptCounter.findOne(
        {
          academicYearId,
        }
      );

    if (
      !counter
    ) {
      counter =
        await ReceiptCounter.create(
          {
            academicYearId,
            sequence:
              0,
          }
        );
    }

    counter.sequence += 1;

    await counter.save();

    const year =
      academicYear.startDate.getFullYear();

    const paddedSequence =
      String(
        counter.sequence
      ).padStart(
        6,
        "0"
      );

    return `RHS-${year}-${paddedSequence}`;
  };

module.exports =
  generateReceiptNumber;