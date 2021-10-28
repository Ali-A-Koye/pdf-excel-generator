const validate = require("./validate");
const columnGen = require("./columnGen");
const pdf = require("./dependencies/pdf/downloader");
const excel = require("./dependencies/excel/downloader");

module.exports = async function pdfExcelGen(data = [], type, res, asOp) {
  const init = validate(data, type, asOp);

  if (typeof init == "string") {
    console.log("pdf-excel-generator Error" , init);
    return -1;
  } else {
    const columns = columnGen(Object.keys(init.data[0]), init.type, init.asOp);

    if (init.type == "pdf") {
      await pdf(columns, init.data, res);
    } else {
      await excel(columns, init.data, res);
    }
  }
};
