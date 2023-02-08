
// const mongoose = require("mongoose")
// const { uuid } = require('uuidv4');

// console.log(uuid());
// console.log(isUuid('75442486-0878-440c-9db1-a7006c25a39f'));



//value validation
const isValid= function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

//request validation
const isValidRequest = function (request) {
    return (Object.keys(request).length > 0)
}

//email validation
const isValidEmail = function (email) {
    const emailRegex = /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/
    return emailRegex.test(email)
}

//name validation
const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z , ]{2,30}$/
    return nameRegex.test(name)
}
// mobile validation
const isValidPhone = function (Phone) {
    const mobileRegex = /^[6-9]\d{9}$/
    return mobileRegex.test(Phone)
}

//status validation
const isValidStatus = function (status) {
    return ['ACTIVE', 'INACTIVE'].indexOf(status) !== -1
}

//card type validation
const isValidCardType = function (cardType) {
    return ['REGULAR', 'SPECIAL'].indexOf(cardType) !== -1
}

//Date Validation
const isValidDate =function(date){
    //const dateRegex = /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/
    const dateRegex =  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    return dateRegex.test(date)
}


const isValidId = function (data) {
    return mongoose.Types.ObjectId.isValid(data);
  };

//Exporting modules
module.exports = {
      isValidId,
      isValidDate,
      isValidEmail, 
      isValid, 
      isValidName, 
      isValidPhone,
      isValidRequest, 
      isValidStatus, 
      isValidCardType
    }
    var regexp = /^[a-z]+\s[a-z ]+$/i