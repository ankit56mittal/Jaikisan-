const cardModel=  require("../models/cardModel")
 const {isValid,isValidId, isValidRequest,isValidCardType, isValidName ,isValidStatus} =require("../middleware/validation");
const customerModel = require("../models/customerModel");


 const getAllCards = async (req, res)=> {
    try{

      
        
        let cards = await cardModel.find({ isDeleted: false})
       
       

        if (cards && cards.length === 0) return res.status(404).send({ status: false, msg: "No card found" });
        return res.status(200).send({ status: true, message: "cards list", data: cards })
    }

    catch(error){
        res.status(500).send({status: false, message: "error", error: error.message})
    }
}

 
const createCards = async (req, res)=>{
    try{
        let data =req.body
let { cardType, customerName, status, vision, customerID ,cardNumber} = data

// If empty request body
if (!isValidRequest(data)) return res.status(400).send({ status: false, message: "Please enter Card data" });



        if (!cardType) {
            return res.status(400).send({ status: false, message: "enter the cardType" })
        }

        if (!isValidCardType(cardType)) {
            return res.status(400).send({ status: false, message: "cardType should be REGULAR or SPECIAL" })
        }
        if (!customerName) {
            return res.status(400).send({ status: false, message: "enter customerName" })
        }
        if (!isValidName(customerName)) {
            return res.status(400).send({ status: false, message: "customerName only should be valid" })

        }

        if (!status) {
            return res.status(400).send({ status: false, message: "enter card status" })
        }
        if (!isValidStatus(status)) {
            return res.status(400).send({ status: false, message: "allowed value for status is ACTIVE OR INACTIVE" })

        }
        let customer = await customerModel.findOne({ customerID: customerID })
        if (!customer) {
            return res.status(404).send({ status: false, message: `customerID ${customerID} not found` })
        }
        let checkCustomer = await cardModel.findOne({ customerID: customerID })
        if (checkCustomer) {
            return res.status(400).send({ status: false, message: `Card already present with this ${customerID} customerID ` })
        }

const docs= cardModel.find().sort({cardNumber:-1}).select({cardNumber:1})

if(docs.length === 0){
   data.cardNumber = "C001"
}else{
    const highestCardNo = docs[0].cardNumber
    const numberPart = parseInt(highestCardNo.substr(1))
    data.cardNumber = "C" + (numberPart + 1).toString().padStart(3,"0")

}

  // Can't Set deleted true at creation time
  if (isDeleted == true) return res.status(400).send({ status: false, message: "You can't add this key at data creation time." })

  let savedData = await cardModel.create(data)
  return res.status(201).send({ status: true, data: savedData })


    }catch(error){
        res.status(500).send({status: false ,message: "error", error: error.message})
    }
}




module.exports ={getAllCards,createCards}