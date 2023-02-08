const customerModel = require("../models/customerModel")
const {
     //isValidId, 
     isValidDate,
     isValidEmail,
    // isValid,
     isValidName,
     isValidPhone, 
     isValidRequest,
     isValidStatus }   =require ("../middleware/validation")
const { uuid } = require('uuidv4');

const customeruuid= uuid();
//console.log(isUuid('75442486-0878-440c-9db1-a7006c25a39f'));


const getAllCustomers = async (req,res)=> {
    try {
     
        const customers = await customerModel.find({ isDeleted: false, status: 'ACTIVE'})
        return res.status(200).send({ status: true, message: "Customers list", data: customers })

    } catch (err){
        return res.status(500).send({ message: err.message })

    }
}

const deleteCustomer = async (req, res) => {
    try {
        let data = req.body

        let deleteCustomer = await customerModel.findOneAndUpdate(
            { data, isDeleted: false },
            { $set: { isDeleted: true } },
            { new: true })

        if (!deleteCustomer) {
            return res.status(404).send({ status: false, message: "customer not found" })
        }

        return res.status(200).send({ status: true, message: 'Customer  deleted successfully' })
    }
 catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const createCustomer = async (req, res) => {
    try {
        let { firstName, lastName, mobileNumber, DOB, emailID, address, status, isDeleted } = req.body;
        // If empty request body
        if (!isValidRequest(req.body)) return res.status(400).send({ status: false, message: "Please enter  data" });

        // First Name Validation
        
        if (!(firstName))
            return res.status(400).send({ status: false, message: "firstName is required" });
        if (!isValidName(firstName)) return res.status(400).send({ status: false, message: "firstName is not valid" })
        
       // last name validation
       
       if (!(lastName))
       return res.status(400).send({ status: false, message: "lastName is required" });
       if (!isValidName(lastName)) return res.status(400).send({ status: false, message: "lastName is not valid" })
       
       // mobile no  validation
       if (!(mobileNumber))
       return res.status(400).send({ status: false, message: "mobile Number is required" });

       if (!isValidPhone(mobileNumber))
       return res.status(400).send({ status: false, message: "mobile Number is not valid" });

       const checkMobileNo = await customerModel.findOne({ mobileNumber: mobileNumber });
       if (checkMobileNo) {
       return res.status(400).send({ status: false, message: "mobile Number already exist" });
   }

   if (!(DOB))
       return res.status(400).send({ status: false, message: "DOB is required" });
   if (!isValidDate(DOB))
       return res.status(400).send({ status: false, message: "DOB is not valid" });

   if (!(emailID))
       return res.status(400).send({ status: false, message: "emailID is required" });
   if (!(isValidEmail(emailID)))
       return res.status(400).send({ status: false, message: "emailID is not valid" });
   const checkusedEmail = await customerModel.findOne({ emailID: emailID });
   if (checkusedEmail) {
       return res.status(400).send({ status: false, message: "email already used" });
   }

   if (!(address))
       return res.status(400).send({ status: false, message: "address is required" });

   if (!(status))
       return res.status(400).send({ status: false, message: "status is required" });
   if (!isValidStatus(status))
       return res.status(400).send({ status: false, message: "allowed value for status is ACTIVE or INACTIVE " });

       
       
       
       
        // Can't Set deleted true at creation time
        if (isDeleted == true) return res.status(400).send({ status: false, message: "You can't add this key at data creation time." })
        const customerData = { firstName, lastName, mobileNumber, DOB, emailID, address, customerID: customeruuid, status }
        let savedData = await customerModel.create(customerData)
        return res.status(201).send({ status: true, data: savedData })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports ={createCustomer , getAllCustomers ,deleteCustomer}