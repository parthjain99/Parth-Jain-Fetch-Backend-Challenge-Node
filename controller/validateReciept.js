//Function to validate retailer name.
function validateRetailerName(retailerName) {
    return /^\S+/.test(retailerName);
  }

//Function to validate total
function validateTotal(total) {
    return /^\d+\.\d{2}$/.test(total);
  };
 
//Function to validate items
function validateItemDescription(items) {
    if (items.length < 1){
        return false;
    }
    for(let i = 0; i < items.length; i++){
        item = items[i];
        if(!item['shortDescription'] || !item['price']){
            return false;
        }
        if (!/^[\w\s\-]+$/.test(item['shortDescription'])){
            return false;
        }
        if (!/^\d+\.\d{2}$/.test(item['price'])){
            return false;
        }
    };
    return true;
};

//Function to validate date
function validateDate(dateString) {
    // First check for the pattern
    let regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(dateString))
    {
        return false;
    }

    // Parse the date parts to integers
    var parts   = dateString.split("-");
    var day     = parseInt(parts[2], 10);
    var month   = parseInt(parts[1], 10);
    var year    = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    {
        return false;
    }

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    {
        monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}


//Function to validate time
function validatePurchaseTime(purchaseTime) {
    const pattern = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
    return pattern.test(purchaseTime);
};

function validateall(retailer, purchaseDate, purchaseTime, items, total){
    if(!validateRetailerName(retailer)){
        return [false, "invalid retailer name"];
    }
    if (!validateTotal(total)){
        return [false, "invalid total"];
    }
    if (!validateItemDescription(items)){
        return [false, "invalid items"];
    }   
    if (!validateDate(purchaseDate)){
        return [false, "invalid purchase date"];
    }
    if (!validatePurchaseTime(purchaseTime)){
        return [false, "invalid purchase time"];
    }
    return [true, ""];
}

module.exports = {validateall};
