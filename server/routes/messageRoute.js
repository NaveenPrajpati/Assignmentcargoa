const express = require("express");
const {  getAllTransporter, saveMessage, allMessage, addPriceMessage,generateOrderId } = require("../controller/messageController");


const router = express.Router();

//public routes

router.post("/message", saveMessage);
router.get("/message", allMessage);
router.get("/message/id", generateOrderId);
router.put("/message/:id", addPriceMessage);
router.get("/transporter", getAllTransporter);


module.exports = router;