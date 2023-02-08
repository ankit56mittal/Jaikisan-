const mongoose =require('mongoose')
//const ObjectId= mongoose.Schema.Types.ObjectId

const cardSchema =new mongoose.Schema({
    cardNumber:{
        type:String,
        required:true
    },
    cardType:{
        type:String,
        required:true,
        enum:["REGULAR","SPECIAL"]
    },
    customerName:{
        type:String,
        required:true
    },
    status: {
        type: String,
        required:true,
        enum:["ACTIVE","INACTIVE"],
        default: "ACTIVE"
    } ,
    vision:{
        type:String,
        
    },
    customerID:{ 
        type: String, 
        ref: 'Customer',
        required: true
        
    },
    isDeleted: { 
        type: Boolean,
        default: false 
    }

},{timestamps:true}
)

module.exports= mongoose.model("Card",cardSchema)