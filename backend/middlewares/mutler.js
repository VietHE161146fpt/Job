const multer = require("multer");

// Tạo cấu hình lưu trữ cho multer
const storage = multer.memoryStorage();

// Tạo middleware xử lý việc upload một file duy nhất
const singleUpload = multer({ storage }).single("file");

module.exports = singleUpload;
