const Application = require("../models/application.model");
const Job = require("../models/job.model");
const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // Find application
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        success: false,
        message: "Application not found",
      });
    }

    // Handle based on status type
    if (status === "Accepted") {
      const result = await handleAcceptedStatus(req.body, application);
      if (!result.success) {
        return res.status(400).json(result);
      }
    } else if (status === "Rejected") {
      const result = await handleRejectedStatus(req.body, application);
      if (!result.success) {
        return res.status(400).json(result);
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const handleAcceptedStatus = async (requestBody, application) => {
  const { status, location, time } = requestBody;

  // Validate required fields
  const requiredFields = {
    status,
    location,
    time,
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return {
        success: false,
        message: `${field} is required`,
      };
    }
  }

  // Update application
  application.status = status.toLowerCase();
  application.location = location;
  application.time = time;
  await application.save();

  return { success: true };
};

const handleRejectedStatus = async (requestBody, application) => {
  const { reason } = requestBody;

  if (!reason) {
    return {
      success: false,
      message: "Reason is required",
    };
  }

  // Update application
  application.status = requestBody.status.toLowerCase();
  application.reason = reason;
  await application.save();

  return { success: true };
};
const applicationController = {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
};
module.exports = applicationController;
