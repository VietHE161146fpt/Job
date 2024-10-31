const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

const companyController = require("../controllers/company.controller.js");
const singleUpload = require("../middlewares/mutler.js")
const router = express.Router();

router.post("/register", isAuthenticated,singleUpload, companyController.registerCompany);
router.get("/get",isAuthenticated, companyController.getCompany);
router.get("/getnet",isAuthenticated, companyController.getAllCompanies);
router.get("/get/:id", isAuthenticated, companyController.getCompanyById);
router.put(
  "/update/:id",
  isAuthenticated,
  singleUpload,
  companyController.updateCompany
);

module.exports = router;
 