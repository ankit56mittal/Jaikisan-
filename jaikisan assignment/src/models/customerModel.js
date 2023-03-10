const mongoose = require("mongoose");

const customerSchema= new mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true
        },
        lastName: {
            type: String,
            required:true
        },
        mobileNumber: {
            type: String,
            required:true,
            unique: true 
        },
        DOB: {
            type: Date,
            required:true
        },
        emailID: {
            type: String,
            required:true,
            unique: true 
        },
        address: {
            type: String,
            required:true
        },
        customerID: {
            type: String
            
        },
        status: {
            type: String,
            required:true,
            enum:["ACTIVE","INACTIVE"]
        },
        isDeleted: { 
            type: Boolean,
            default: false 
        }


    },{timestamps:true}
)
module.exports =mongoose.model("Customer",customerSchema)