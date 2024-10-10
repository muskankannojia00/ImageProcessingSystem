const { uploadImages, checkStatus } = require("../services/imageService");
const Request = require("../models/Request");

// exports.uploadCSV = (req, res) => {
//   const requestId = uploadImages(req.file);
//   console.log(requestId, "requestId");
//   res.json({ requestId });
// };

// exports.uploadCSV = async (req, res) => {
//   try {
//     const requestId = await uploadImages(req.file); // Await the request ID from the uploadImages function
//     console.log("Returned Request ID:", requestId); // Log the returned request ID
//     res.json({ requestId }); // Send the response with the request ID
//   } catch (error) {
//     console.error("Error during CSV upload:", error); // Log any errors
//     res.status(500).json({ error: "Error processing upload" }); // Return an error response
//   }
// };

exports.uploadCSV = async (req, res) => {
  try {
    console.log("Received CSV upload request"); // Log to confirm request received

    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { requestId, inputUrls } = await uploadImages(req.file);
    console.log("Returned Request ID:", requestId);
    console.log("Parsed Input URLs:", inputUrls);

    res.json({ requestId, inputUrls }); // Send back the requestId and URLs
  } catch (error) {
    console.error("Error during CSV upload:", error); // Log the actual error
    res
      .status(500)
      .json({ error: "Error processing upload", details: error.message });
  }
};

// exports.getStatus = (req, res) => {
//     const status = checkStatus(req.params.id);
//     res.json({ status });
// };

// In src/controllers/imageController.js
exports.getStatus = async (req, res) => {
  try {
    const requestId = req.params.id; // Get request ID from URL parameters
    const request = await Request.findOne({ requestId }); // Query the database

    if (request) {
      console.log(request, "request 53");
      // If the request exists, return its status and URLs
      return res.json({
        status: request.status,
        outputUrls: request.outputUrls || [], // Ensure outputUrls is included
      });
    } else {
      // If no request is found, return a 404 error
      return res.status(404).json({ error: "Request ID not found" });
    }
  } catch (error) {
    console.error("Error fetching status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
