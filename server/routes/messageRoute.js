const express = require("express");
const {  getAllTransporter, saveMessage, allMessage, addPriceMessage,generateOrderId } = require("../controller/messageController");
const validateToken = require("../middleware/validateTokenHandler");


const router = express.Router();

//public routes

router.post("/message",validateToken, saveMessage);
router.get("/message",validateToken, allMessage);
router.get("/message/id",validateToken, generateOrderId);
router.put("/message/:id",validateToken, addPriceMessage);
router.get("/transporter",validateToken, getAllTransporter);


module.exports = router;