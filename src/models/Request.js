// const mongoose = require('mongoose');

// // Define the request schema
// const requestSchema = new mongoose.Schema({
//     requestId: { type: String, required: true },
//     inputUrls: { type: [String], required: true },
//     outputUrls: { type: [String], default: [] },
//     status: { type: String, default: 'processing' },
//     createdAt: { type: Date, default: Date.now },
// });

// // Static method to update request status
// requestSchema.statics.updateRequestStatus = async function (requestId, status, outputUrls = []) {
//     return this.findOneAndUpdate({ requestId }, { status, outputUrls });
// };

// module.exports = mongoose.model('Request', requestSchema);

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestId: { type: String, required: true },
  inputUrls: { type: [String], required: true },
  outputUrls: { type: [String], default: [] },
  status: { type: String, default: "processing" },
  createdAt: { type: Date, default: Date.now },
});

requestSchema.statics.updateRequestStatus = async function (
  requestId,
  status,
  outputUrls = []
) {
  return this.findOneAndUpdate(
    { requestId },
    { status, outputUrls }, // Make sure this updates outputUrls
    { new: true } // Return the updated document
  );
};

module.exports = mongoose.model("Request", requestSchema);
