const Queue = require("bull");
const sharp = require("sharp");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const { updateRequestStatus } = require("../models/Request");

// Create a Bull queue for image processing
const imageQueue = new Queue("image-processing");

// Ensure output directory exists
const outputDir = path.resolve(__dirname, "../output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

imageQueue.process(async (job) => {
  const { requestId, inputUrls } = job.data;

  try {
    const outputUrls = [];
    for (const url of inputUrls) {
      const trimmedUrl = url.replace(/['"]/g, "").trim();
      console.log("Fetching image from URL:", trimmedUrl); // Log the URL

      const imageName = path.basename(trimmedUrl);
      const outputPath = path.join(outputDir, `${requestId}-${imageName}`);
      console.log("Output Path:", outputPath); // Log the output path

      // Fetch the image
      const response = await axios({
        url: trimmedUrl,
        responseType: "arraybuffer",
      });
      console.log("Image fetched successfully."); // Log success

      const imageBuffer = response.data;

      // Compress the image using sharp
      await sharp(imageBuffer).jpeg({ quality: 50 }).toFile(outputPath);
      console.log("Image processed and saved to:", outputPath); // Log success
      outputUrls.push(outputPath); // Add output path to the array
    }

    // Update the database with the output URLs and status
    await updateRequestStatus(requestId, "completed", outputUrls);
    console.log("Database updated with output URLs:", outputUrls); // Log the output URLs
  } catch (err) {
    console.error("Error processing image:", err);
    await updateRequestStatus(requestId, "failed");
  }
});

module.exports = imageQueue;
