/* eslint-disable new-cap */
const pdfMakePrinter = require("pdfmake");
const path = require("path");
const streamBuffers = require("stream-buffers");
const moment = require("moment");
const _ = require("lodash");
const { defaultStyle } = require("./style");

module.exports = async (
  columns,
  query,
  res,
  filename=`PDF_Generated_${moment().format("YYYY-MM-DD")}`,
) => {
  let headers = [],
    data = [],
    width = [],
    config = {
      content: [],
      pageOrientation: 'landscape',
      styles: defaultStyle,
    },
    fontDescriptors = {
      Roboto: {
        normal: path.join(__dirname, "/fonts/Rabar.ttf"),
        bold: path.join(__dirname, "/fonts/Roboto-Medium.ttf"),
      },
    };

  //mapping Columns And Data
  headers = _.map(columns, (el) => {
    width.push(el.width);
    return {
      text: el.header,
      style: el.style || "tableHeader",
    };
  });

  data = _.map(query, (el) => {
    let arr = [];
    _.map(columns, (head) => {
      arr.push(el[head.key] || " ");
    });
    return arr;
  });
  data.unshift(headers);


  //report date and report range
  config.content.push({
    columns: [
      {
        width: "*",
        text: `Date : ${moment().format("YYYY-MM-DD")}`,
        margin: [0, 30, 0, 8],
        style: "titleStyle",
      }
    ],
  });

  //Table contents
  data.length > 0 &&
    config.content.push({
      style: "tableExample",
      table: {
        headerRows: 1,
        widths: width,
        body: data,
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === node.table.body.length ? 1.3 : 1;
        },
        vLineWidth: function (i, node) {
          return i === 0 || i === node.table.widths.length ? 1.3 : 1;
        },
        hLineColor: function (i, node) {
          return i === 0 || i === node.table.body.length ? "black" : "gray";
        },
        vLineColor: function (i, node) {
          return i === 0 || i === node.table.widths.length ? "black" : "gray";
        },
      },
    });

  //Finalize and Sending back the file
  let printer = new pdfMakePrinter(fontDescriptors);

  let doc = printer.createPdfKitDocument(config);

  const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
    frequency: 10, 
    chunkSize: 2048,
  });

  doc.on("data", function (chunk) {
    myReadableStreamBuffer.put(chunk);
  });

  doc.on("end", function () {
    myReadableStreamBuffer.stop();
    res.attachment(`${filename}.pdf`);
    myReadableStreamBuffer.pipe(res);
  });
  doc.end();
};
