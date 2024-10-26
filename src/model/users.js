const mongoose=require("../dao");
const Schema=mongoose.Schema;

const User=new Schema({
    _id:mongoose.ObjectId,
    name:{type:String, required:true, unique:true, dropDups:true },
    password:{type:String, required:true, unique:true,}
},{collection:"users"});

module.exports=mongoose.model("users",User)