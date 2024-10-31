const Job = require("../models/job.model");

const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position: Number(position),
      company: companyId,
      created_by: userId,
    });
    return res.status(200).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
      path: "company",
      select: "name",
    });
    if (!jobs) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
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

// const getAdminJobs = async (req, res) => {
//     try {
//       const adminId = req.id;
//       const jobs = await Job.find({ created_by: adminId });
  
//       // Check if the jobs array is empty
//       if (!jobs || jobs.length === 0) {
//         return res.status(404).json({
//           message: "Jobs not found",
//           success: false, // Corrected typo here
//         });
//       }
  
//       return res.status(200).json({
//         jobs,
//         success: true, // Corrected typo here
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         message: "Server error",
//         success: false,
//       });
//     }
//   };
const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: 'company', // Đảm bảo rằng bạn populate tên công ty
      select: 'name',
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while processing your request.",
      success: false,
    });
  }
};

  
const jobController = {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
};
module.exports = jobController;
