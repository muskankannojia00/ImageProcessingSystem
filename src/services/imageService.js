const imageQueue = require("../jobs/imageProcessingWorker");
const Request = require("../models/Request");
const csvParser = require("../utils/csvParser");

// Handles the CSV upload and adds processing jobs to the queue
exports.uploadImages = async (file) => {
  console.log("Uploading images from file:", file);
  if (!file) {
    throw new Error("No file uploaded");
  }

  try {
    // Parse the CSV file to get the requestId and inputUrls
    const { requestId, inputUrls } = await csvParser.parseCSV(file.path);
    console.log("Parsed Request ID:", requestId); // Log the generated request ID
    console.log("Parsed Input URLs:", inputUrls); // Log the collected input URLs
    if (!requestId || !inputUrls.length) {
      throw new Error("Invalid parsed data: requestId or inputUrls missing");
    }

    // Create a new request in the database
    const request = await Request.create({ requestId, inputUrls });
    // Add the job to the processing queue
    await imageQueue.add({ requestId, inputUrls });

    return { requestId, inputUrls }; // Return the requestId
  } catch (error) {
    console.error("Error in uploadImages function:", error);
    throw error;
  }
};

// Fetches the status of the image processing based on request ID
exports.checkStatus = async (requestId) => {
  const request = await Request.findOne({ requestId });
  console.log(request, "request");
  return request
    ? { status: request.status, outputUrls: request.outputUrls }
    : null;
};
