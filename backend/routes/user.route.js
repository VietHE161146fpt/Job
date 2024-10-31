const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const userController = require("../controllers/user.controller.js");
const singleUpload = require("../middlewares/mutler.js")
const router = express.Router();

router.post("/register",singleUpload, userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post(
  "/profile/update",
  isAuthenticated,
  singleUpload,
  userController.updateProfile
);
router.get("/getuser",isAuthenticated, userController.getAllUsers)
module.exports = router;
