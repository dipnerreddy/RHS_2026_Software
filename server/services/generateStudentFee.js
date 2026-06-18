const AcademicYear =
  require(
    "../models/AcademicYear"
  );

const FeeTemplate =
  require(
    "../models/FeeTemplate"
  );

const StudentFee =
  require(
    "../models/StudentFee"
  );

const generateStudentFee =
  async ({
    studentId,
    academicYearId,
    className,
    createdBy,
  }) => {

    const existingFee =
      await StudentFee.findOne({
        studentId,
        academicYearId,
      });

    if (existingFee) {
      return;
    }

    const template =
      await FeeTemplate.findOne({
        academicYearId,
        className,
      });

    if (!template) {
      throw new Error(
        `Fee template not found for class ${className}`
      );
    }

    const academicYear =
      await AcademicYear.findById(
        academicYearId
      );

    if (!academicYear) {
      throw new Error(
        "Academic year not found"
      );
    }

    const dueDate =
      new Date(
        academicYear.startDate
      );

    dueDate.setDate(
      dueDate.getDate() + 60
    );

    const totalFee =
      template.schoolFee +
      template.defaultTuitionFee;

    await StudentFee.create({
      studentId,

      academicYearId,

      schoolFee:
        template.schoolFee,

      usesTuition: true,

      tuitionFee:
        template.defaultTuitionFee,

      usesBus: false,

      busFee: 0,

      discountAmount: 0,

      totalFee,

      paidAmount: 0,

      balanceAmount:
        totalFee,

      dueDate,

      status:
        "PENDING",

      createdBy,
    });
  };

module.exports =
  generateStudentFee;