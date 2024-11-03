const mongoose = require("mongoose");
const User = require("./user.model");
const Company = require("./company.model");
const Job = require("./job.model");
const Application = require("./application.model");
// Khai bao goi tuong mongoose su dung nhu 1 bien global
mongoose.Promise = global.Promise;
// Khai bao 1 doi tuong dai dien DB lam viec

const db = {};
// Bo sung cac thuoc tinh cho db
db.mongoose = mongoose;
db.user = User;
db.company = Company;
db.job = Job;
db.application = Application;

db.connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("Connect to MongoDB success"))
    .catch((error) => console.error(error.message));
};

module.exports = db;
