const mongoose = require('mongoose');
  
const imageSchema = new mongoose.Schema({
    //name: String,
    //desc: String,
    img_200_200:
    {
        data: Buffer,
        contentType: String,
        originalname: String
    },
    img_1000_1000:
    {
        data: Buffer,
        contentType: String,
        originalname: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image', imageSchema);