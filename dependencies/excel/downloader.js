/* eslint-disable new-cap */
const ExcelJS = require("exceljs");
const streamBuffers = require("stream-buffers");
const moment = require("moment")
module.exports = async (
  columns,
  data,
  res,
  sheetname = `Excel_Generated_${moment().format("YYYY-MM-DD")}`,
) => {
  const myWritableStreamBuffer = new streamBuffers.WritableStreamBuffer({
    incrementAmount: 10 * 1024,
  });
  const options = {
    stream: myWritableStreamBuffer,
    useStyles: true,
    useSharedStrings: true,
  };

  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options);
  const worksheet = workbook.addWorksheet(sheetname);

  worksheet.columns = columns;
  for (let i = 0; i < data.length; i += 1) {
    worksheet.addRow(data[i]);
  }

  worksheet.eachRow(function (Row, rowNum) {
    Row.eachCell(function (Cell, cellNum) {
      Cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });
    if (rowNum == 1) {
      Row.font = {
        size: 15,
        bold: true,
      };
    }
  });
  workbook
    .commit()
    .then(() => {
      const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
        frequency: 10,
        chunkSize: 2048,
      });
      myReadableStreamBuffer.put(myWritableStreamBuffer.getContents());
      myReadableStreamBuffer.stop();
      res.attachment(`${sheetname}.xlsx`);
      myReadableStreamBuffer.pipe(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

