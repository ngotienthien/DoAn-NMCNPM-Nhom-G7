
const userModel = require("../models/user.model");

module.exports = {
    Check: async function (IDUser) {
        const result = await userModel.SingleUserPremium(IDUser);
        let type = 0;
        if (result.length != 0) {
          var DateNow = new Date();
      
          var DateEnd = new Date(result[0].DateEnd);
          if (DateNow > DateEnd) {
            type = 1;
          }
        } 
        else {
          type = 2;
        }
        return type;
      }
}