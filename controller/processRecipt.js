//Function to add One point for every alphanumeric character in the retailer name.
function addRetailerName(retailerName) {
    let count = 0;
    for (let i = 0; i < retailerName.length; i++) {
      if (/[a-zA-Z0-9]/.test(retailerName[i])) {
        count++;
      }
    }
    return count;
  };
  
//Function to add 50 points if the total is a round dollar amount with no cents.
function addRoundDollarTotal(total) {
    let flag = false;
    if (/^\s*\d+(\.0+)?\s*$/.test(total)) {
       flag = true
      }
    return flag?50:0
  };
  
  
//Function to add 25 points if the total is a multiple of 0.25.
function addMultiple025Total(total) {
    let flag = false;
    if (/^\d+(\.0+|\.25(0+)?|\.5(0+)?|\.75(0+)?)?$/.test(total)) {
       flag = true
      }
    return flag?25:0
  };
 
//Function to add 5 points for every two items on the receipt.
function addPairItems(items) {
    return Math.floor(items.length/2)*5
};

//Function to add points if the trimmed length of the item description is a multiple of 3, 
//multiply the price by 0.2 and round up to the nearest integer. 
//The result is the number of points earned.
function addItemDescription(items) {
    let sum = 0;
    items.forEach(myFunction);
    function myFunction(item) {
        let str = item['shortDescription'];
        if(str && item['price']){
        let st = str.trim();
        if (st.length%3 === 0){
            sum += Math.ceil(parseFloat(item['price'])*0.2);
        }
    }
    };
    return sum
};

//Function to add 6 points if the day in the purchase date is odd.
function addOddDate(purchaseDate) {
    const dateObj = new Date(purchaseDate + " " + "00:00:00");
    const curDay = dateObj.getDate(); // Extract the day component from the Date object
    return (curDay % 2 === 1)?6:0
};

//Function to add 10 points if the time of purchase is after 2:00pm and before 4:00pm.
function addPurchaseTime(purchaseTime) {
    const initialDate = '01/01/2011'
    const dateObj = Date.parse(initialDate + " " + purchaseTime);
    const time2 = Date.parse(initialDate + ' ' + '14:00:00')
    const time4 = Date.parse(initialDate + ' ' + '16:00:00')
    return (time2<dateObj && dateObj<time4)?10:0
};

function countTotalAmount(retailer, purchaseDate, purchaseTime, items, total){
    let reciptPoint = 0;
    reciptPoint += addRetailerName(retailer);
    reciptPoint += addRoundDollarTotal(total);
    reciptPoint += addMultiple025Total(total);
    reciptPoint += addPairItems(items);
    reciptPoint += addOddDate(purchaseDate);
    reciptPoint += addPurchaseTime(purchaseTime);
    reciptPoint += addItemDescription(items);
    return reciptPoint;
};


module.exports = {countTotalAmount, addRetailerName, addRoundDollarTotal, addMultiple025Total, addPairItems, addOddDate, addPurchaseTime, addItemDescription};