const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
// const { singleUpload } = require("../middlewares/multer.js");
const jobController = require("../controllers/job.controller.js");

const router = express.Router();

router.post("/post", isAuthenticated, jobController.postJob);
router.get("/get", jobController.getAllJobs);

router.get("/getadminjobs",isAuthenticated, jobController.getAdminJobs);
router.get("/get/:id", jobController.getJobById);

module.exports = router;
