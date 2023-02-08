const express = require('express');
const router = express.Router();
const customerController = require("../controllers/customerController")
const cardController = require("../controllers/cardController")


//customer Api

router.post("/createCustomer",customerController. createCustomer)
router.get("/getAllCustomer", customerController.getAllCustomers)
router.delete("/deleteCustomer",customerController. deleteCustomer)


//Card Api

router.post("/createCard", cardController.createCards)
router.get("/getAllCardList", cardController.getAllCards)


//Error Handing
router.all('/*', (req, res) => {
    res.status(404).send({ status: false, message: "URL Not Found" })
})
module.exports = router