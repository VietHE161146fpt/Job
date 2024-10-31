const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    location: {
      type: String,
      required: function () {
        return this.status === "accepted";
      },
    },
    time: {
      type: Date,
      required: function () {
        return this.status === "accepted";
      },
    },
    reason: {
      type: String,
      required: function () {
        return this.status === "rejected";
      },
    },
  },
  { timestamps: true }
);
const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
