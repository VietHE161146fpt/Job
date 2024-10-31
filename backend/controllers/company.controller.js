const Company = require("../models/company.model.js");
const getDataUri =require( "../utils/datauri.js");
const cloudinary =require( "../utils/cloudinary.js");

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
  
        // Kiểm tra tên công ty
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
  
        // Kiểm tra xem người dùng đã có công ty chưa
        let existingCompany = await Company.findOne({ userId: req.id });
        if (existingCompany) {
            return res.status(400).json({
                message: "You can only register one company per account.",
                success: false
            });
        }
  
        // Kiểm tra xem tên công ty đã tồn tại chưa
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "This company name is already taken.",
                success: false
            });
        }
  
        // Tạo công ty mới
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
  
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while registering the company.",
            success: false
        });
    }
  };
  
//  const registerCompany = async (req, res) => {
//   try {
//       const { companyName } = req.body;
//       if (!companyName) {
//           return res.status(400).json({
//               message: "Company name is required.",
//               success: false
//           });
//       }
//       let company = await Company.findOne({ name: companyName });
//       if (company) {
//           return res.status(400).json({
//               message: "You can't register same company.",
//               success: false
//           })
//       };
//       company = await Company.create({
//           name: companyName,
//           userId: req.id
//       });

//       return res.status(201).json({
//           message: "Company registered successfully.",
//           company,
//           success: true
//       })
//   } catch (error) {
//       console.log(error);
//   }
// }
 const getCompany = async (req, res) => {
  try {
      const userId = req.id; // logged in user id
      const companies = await Company.find({ userId });
      if (!companies) {
          return res.status(404).json({
              message: "Companies not found.",
              success: false
          })
      }
      return res.status(200).json({
          companies,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}
// get company by id
 const getCompanyById = async (req, res) => {
  try {
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      if (!company) {
          return res.status(404).json({
              message: "Company not found.",
              success: false
          })
      }
      return res.status(200).json({
          company,
          success: true
      })
  } catch (error) {
      console.log(error);
  }
}
 const updateCompany = async (req, res) => {
  try {
      const { name, description, website, location } = req.body;

      const file = req.file;
      // idhar cloudinary ayega
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      const logo = cloudResponse.secure_url;
  
      const updateData = { name, description, website, location, logo };

      const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!company) {
          return res.status(404).json({
              message: "Company not found.",
              success: false
          })
      }
      return res.status(200).json({
          message:"Company information updated.",
          success:true
      })

  } catch (error) {
      console.log(error);
  }
}
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find(); // Lấy tất cả công ty
        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while retrieving companies.",
            success: false
        });
    }
  };
const companyController = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
  getAllCompanies
};
module.exports = companyController;