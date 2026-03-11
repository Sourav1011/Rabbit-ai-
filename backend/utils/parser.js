const fs = require("fs");
const csv = require("csv-parser");
const XLSX = require("xlsx");

function parseCSV(filePath) {

  return new Promise((resolve) => {

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));

  });

}

async function parseFile(filePath) {

  if (filePath.endsWith(".xlsx")) {

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);

  }

  return parseCSV(filePath);
}

module.exports = parseFile;