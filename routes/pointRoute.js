const express = require("express");
const router = express.Router();
const {getPoints, processReceipts} = require("../controller/pointController.js");

router.route('/process').post(processReceipts);
router.route('/:id/points').get(getPoints);


module.exports = router;