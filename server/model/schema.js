const mongoose =require('mongoose');
const userSchema = mongoose.Schema({
    name:String,
    age:Number,
    role:String,
})

const userModel = new mongoose.model('user',userSchema);
module.exports=userModel;