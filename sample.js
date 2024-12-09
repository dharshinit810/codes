getCustomerProperties = function(properties){
    let customerProperties={}
    if (typeof properties === "object") {
        const regex = /^(?:\+91|91)?([7896]\d{9})$/;
        let match;
        for (var key in properties) {
          if (properties.hasOwnProperty(key)) {
            match = properties[key].match(regex)
            if(match){
                customerProperties[key] = '91' + match[1];
            }
            else{
                customerProperties[key] = properties[key];
            }
          }
        }
      }
      console.log(customerProperties)
}
const inputProperties = {
    phone1: "98765",       // Valid 10-digit Indian number
    phone2: "+919876543210",   // Indian number with +91 prefix
    phone3: "919876543210",    // Indian number with 91 prefix
    phone4: "1234567890",      // Invalid number (does not start with 7, 8, 9, or 6)
    email: "example@test.com", // Non-phone property
    phone5: "7896541230"       // Another valid 10-digit number
};

getCustomerProperties(inputProperties)