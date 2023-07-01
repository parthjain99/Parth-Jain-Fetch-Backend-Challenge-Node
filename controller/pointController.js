const asynchandler = require('express-async-handler');
const processReceipt = require('./processRecipt');
const validateReceipt = require('./validateReciept.js');
let data_dictionary = {'7fb1377b-b223-49d9-a31a-5a02701dd310':10}; // id of the recipt is mapped to the the Numeber of Points for that Reciept
const uuidv4  = require("uuid/v4");

//@desc create a Receipts
// calculate the Recipt points.
//@route post/receipts/process
//@access public
const processReceipts = asynchandler(async (req, res)=>{
    const {retailer, purchaseDate, purchaseTime, items, total} = req.body;
    if(!retailer || !purchaseDate || !purchaseTime || !items || !total){
        res.status(400).json({"error":'All fields are required'});
        return;
    }
    let [validReciept, error] = validateReceipt.validateall(retailer, purchaseDate, purchaseTime, items, total)
    if(!validReciept){
        res.status(400).json({"error":error});
        return;
    }
    let receiptPoint = processReceipt.countTotalAmount(retailer, purchaseDate, purchaseTime, items, total)
    let id = uuidv4()
    while(data_dictionary[id]){
        id = uuidv4()
    };
    data_dictionary[id] = receiptPoint;
    res.status(201).json({"id":id});
    return;
});

//@desc get a contact
//@route get/api/contacts/:id
//@access public
const getPoints = asynchandler(async (req, res)=>{
    // const contact = await Contact.findById(req.params.id);
    if(!data_dictionary[req.params.id]){
        res.status(404).json('No receipt found for that id');
        // throw new Error("Contact Not Found");
    }
    else{
        res.status(200).json({"points":data_dictionary[req.params.id]})
    };
    return;
});

module.exports = {getPoints, processReceipts}
