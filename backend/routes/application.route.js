const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
// const { singleUpload } = require("../middlewares/multer.js");
const applicationController = require("../controllers/application.controller.js");

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applicationController.applyJob);
router.get("/get", isAuthenticated, applicationController.getAppliedJobs);

router.get("/:id/applicants",isAuthenticated, applicationController.getApplicants);
router.post("/status/:id/update", isAuthenticated, applicationController.updateStatus);

module.exports = router;
