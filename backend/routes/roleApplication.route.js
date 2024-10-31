const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const singleUpload  = require("../middlewares/mutler.js");
const roleAppController = require("../controllers/roleApplication.controller.js");

const router = express.Router();

router.post("/post", singleUpload, roleAppController.postRoleApplication);
router.get("/get", roleAppController.getAllRoleApplication);
router.get("/get/:id", roleAppController.getRoleApplicationById);
router.post("/updateDetails/:id",singleUpload, roleAppController.updateRoleApplicationDetailsById);
router.post("/updateStatus/:id", roleAppController.updateRoleApplicationStatusById);

module.exports = router;
