const Student =
  require(
    "../models/Student"
  );

const generateAdmissionNumber =
  async () => {
    const currentYear =
      new Date().getFullYear();

    const latestStudent =
      await Student.findOne(
        {
          admissionNumber: {
            $regex:
              `RHS${currentYear}`,
          },
        }
      )
        .sort({
          createdAt:
            -1,
        });

    let sequence =
      1;

    if (
      latestStudent
    ) {
      const lastNumber =
        parseInt(
          latestStudent.admissionNumber.slice(
            -4
          )
        );

      sequence =
        lastNumber +
        1;
    }

    return `RHS${currentYear}${String(
      sequence
    ).padStart(
      4,
      "0"
    )}`;
  };

module.exports =
  generateAdmissionNumber;