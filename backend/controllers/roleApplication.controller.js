const roleApplication = require("../models/roleApplication.model");
const User = require("../models/user.model")
const getDataUri =require( "../utils/datauri.js");
const cloudinary =require( "../utils/cloudinary.js");


const postRoleApplication = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, content, applicant, applicantCompany } = req.body;

    if (!title || !content || !applicant || !applicantCompany) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const parsedApplicantCompany = typeof applicantCompany === "string" ? JSON.parse(applicantCompany) : applicantCompany;
    const fileUri = req.file ? getDataUri(req.file) : null;
    const cloudResponse = fileUri ? await cloudinary.uploader.upload(fileUri.content) : { secure_url: null };

    const newRoleApplication = await roleApplication.create({
      title,
      content,
      applicant,
      applicantCompany: {
        companyName: parsedApplicantCompany.companyName,
        companyAddress: parsedApplicantCompany.companyAddress,
        companyPhoneNumber: parsedApplicantCompany.companyPhoneNumber,
        companyGmail: parsedApplicantCompany.companyGmail,
        companyTaxCode: parsedApplicantCompany.companyTaxCode,
        companyOperatingLicense: cloudResponse.secure_url,
      },
      status: "pending",
    });

    return res.status(201).json({
      message: "New role change application created successfully",
      newRoleApplication,
      success: true,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};


const getAllRoleApplication = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
        title: { $regex: keyword, $options: "i" }
    };
    const allRoleApplication = await roleApplication.find(query).populate("applicant").exec();
    if (!allRoleApplication) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
        allRoleApplication: [
            allRoleApplication.map(app => {
                return {
                    id: app._id,
                    title: app.title,
                    content: app.content,
                    applicant: {
                        id: app.applicant._id,
                        fullName: app.applicant.fullname,
                        email: app.applicant.email,
                        phoneNumber: app.applicant.phoneNumber,
                        profile: app.applicant.profile
                    },
                    applicantCompany: app.applicantCompany,
                    status: app.status
                }
            })
        ],
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getRoleApplicationById = async (req, res) => {
  try {
    const appId = req.params.id;
    const application = await roleApplication.findById(appId).populate("applicant").exec();
    if (!application) {
      return res.status(404).json({
        message: "Role application not found",
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

// user chinh sua application  (chinh sua title, content, applicantCompany)
const updateRoleApplicationDetailsById = async (req, res) => {
  try {
      const appId = req.params.id;
      const { title, content } = req.body;
      const applicantCompany = JSON.parse(req.body.applicantCompany);
      const file = req.file;
      let cloudResponse;
      
      // Tìm ứng dụng cần cập nhật
      const application = await roleApplication.findById(appId);
      if (!application) {
          return res.status(404).json({
              message: "Role application not found",
              success: false,
          });
      }

      // Nếu có file, thực hiện upload lên Cloudinary
      if (file) {
          const fileUri = getDataUri(file);
          cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
              type: "upload",
          });

          // Cập nhật URL của file mới trong application
          application.applicantCompany.companyOperatingLicense = cloudResponse.secure_url;
      }

      // Cập nhật các trường khác
      application.title = title;
      application.content = content;
      application.applicantCompany.companyName = applicantCompany.companyName;
      application.applicantCompany.companyAddress = applicantCompany.companyAddress;
      application.applicantCompany.companyPhoneNumber = applicantCompany.companyPhoneNumber;
      application.applicantCompany.companyGmail = applicantCompany.companyGmail;
      application.applicantCompany.companyTaxCode = applicantCompany.companyTaxCode;

      // Lưu các thay đổi vào cơ sở dữ liệu
      const updatedApplication = await application.save();

      return res.status(200).json({
          updatedApplication,
          success: true,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: "An error occurred while updating the application",
          success: false,
      });
  }
};


// admin duyet application
const updateRoleApplicationStatusById = async (req, res) => {
    try {
        const appId = req.params.id;
        const {applicationStatus, userRole} = req.body;
        const application = await roleApplication.findById(appId);
        if (!application) {
          return res.status(404).json({
            message: "Role applicant not found",
            success: false,
          });
        }

        application.status = applicationStatus;
        const updatedApplication = await application.save();

        const applicantId = application.applicant;
        const applicant = await User.findById(applicantId);
        applicant.role = userRole;
        await applicant.save();

        return res.status(200).json({
            updatedApplication,
          success: true,
        });
      } catch (error) {
        console.log(error);
      }
}

  
const jobController = {
  postRoleApplication,
  getAllRoleApplication,
  getRoleApplicationById,
  updateRoleApplicationDetailsById,
  updateRoleApplicationStatusById,
};
module.exports = jobController;
