const { Parser } =
  require("json2csv");

const ExcelJS =
  require("exceljs");

const exportCSV =
  (
    data,
    fields
  ) => {

    const parser =
      new Parser({
        fields,
      });

    return parser.parse(
      data
    );
  };

const exportExcel =
  async (
    data,
    sheetName
  ) => {

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        sheetName
      );

    if (
      data.length > 0
    ) {

      worksheet.columns =
        Object.keys(
          data[0]
        ).map(
          (
            key
          ) => ({
            header:
              key,

            key,
          })
        );

      worksheet.addRows(
        data
      );
    }

    return workbook;
  };

module.exports = {
  exportCSV,
  exportExcel,
};