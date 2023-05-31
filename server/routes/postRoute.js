const express = require("express");
const { addTransporter, getAllTransporter } = require("../controller/Controller");




// const storage = multer.diskStorage(
//     {destination: function (req, file, cb) {
//         cb(null, './tmp')
//     },
// filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + file.originalname
//         cb(null, uniqueSuffix)
//     }}
// )
//
// const upload = multer({ storage: storage })


const router = express.Router();

//public routes
router.get("/transporter", getAllTransporter);
router.post("/transporter", addTransporter);

module.exports = router;