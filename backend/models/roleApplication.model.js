const mongoose = require("mongoose");

const roleApplicationSchema = new mongoose.Schema({
    title: {
        type: String,
        requỉred: [true, "Title is required"]
    },
    content: {
        type: String,
        requỉred: [true, "Content is required"]
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applicantCompany: {
        companyName: {
            type: String,
            required: [true, "company name is required"]
        },
        companyAddress: {
            type: String,
            required: [true, "company address is required"]
        },
        companyPhoneNumber: {
            type: Number,
            required: [true, "company phone number is required"]
        },
        companyGmail: {
            type: String,
            required: [true, "company email is required"]
        },
        companyTaxCode: {
            type: String,
            required: [true, "company tax code is required"]
        },
        companyOperatingLicense: {
            type: String,
            required: [true, "company operating license is required"]
        }
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    }
},{timestamps:true});
const roleApplication = mongoose.model("roleApplication", roleApplicationSchema);

module.exports = roleApplication;
