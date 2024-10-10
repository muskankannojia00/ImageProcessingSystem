const csv = require("csv-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const inputUrls = [];
    const requestId = uuidv4(); // Generate a unique request ID

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // console.log("CSV Row:", row);
        // Make sure to trim spaces and check for any possible variations in the column name
        const urlsColumn =
          row["Input Image Urls"] ||
          row["Input Image URLs"] ||
          row["Input image urls"];

        if (urlsColumn) {
          const urls = urlsColumn.split(",").map((url) => url.trim());
          inputUrls.push(...urls);
          console.log("Collected URLs:", urls);
        } else {
          console.log("No URL column found in this row."); // Warn if no URL column found
        }
      })
      .on("end", () => {
        if (inputUrls.length > 0) {
          console.log("Collected Input URLs:", inputUrls); // Debugging log
          resolve({ requestId, inputUrls });
        } else {
          console.error("No valid input URLs found");
          reject(new Error("No valid input URLs found in the CSV file"));
        }
      })
      .on("error", (err) => reject(err));
  });
};
