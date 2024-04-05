const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/KYC");



//check database connected or not
 connect.then(() => {
      console.log("KYC database connected");



 })
 .catch(() => {
   console.log("not connected")

})


//schema 
 const Loginschema = new mongoose.Schema({
        name: {
          type: String,
          required: true

        },
        password: {
           type:String,
           required: true
        },
       role: {
           type:String,
           required: true
        },
//email: {
         //  type:String,
//required: true
        //}
        

});

      
 /* businessName: String,
  description: String,
  location: String,
  businessHoursStart: String,
  businessHoursEnd: String,
  contact: String,
  socialMediaLink1: String,
  socialMediaLink2: String,
  businessCertificate: String, // This will store the path to the uploaded file
  tin: String
});
*/


//collection part
const collection = new mongoose.model("Users",Loginschema);



 module.exports = collection;
 


 