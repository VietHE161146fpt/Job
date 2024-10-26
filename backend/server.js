require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRoute = require("./routes/user.route");
const CompanyRoute = require("./routes/company.route")
const JobController = require("./routes/job.route")
const Application = require("./routes/application.route")

require('dotenv').config();



// Khoi tao Express webserver
const app = express();

// Bo sung cac middleware kiem soat hoat dong cua client toi webserver
app.use(bodyParser.json());
app.use(morgan("dev"));


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
// Router toi web root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to RESTFull API",
  });
});

// Tiep nhan cac Request tu Client
app.use("/api/user", UserRoute);
app.use("/api/company",CompanyRoute)
app.use("/api/job",JobController)
app.use("/api/application", Application)

app.use(async (req, res, next) => {
  next(httpErrors.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Tiep nhan cac req(s)
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server is running at: ${process.env.HOST_NAME}:${process.env.PORT}`
  );
  db.connectDB();
});
