const mongoose=require("../dao");
const Schema=mongoose.Schema;

const Car=new Schema({
    _id:mongoose.ObjectId,
    name:{type:String,required:true, unique:true, dropDups:true},
    type:{type:String,required:true, unique:true},
    price:{type:Number,required:true, unique:true, min:400000, max:5000000},
    fuel:{type:String,required:true, unique:true}
},{collection:"cars"});


module.exports=mongoose.model("cars",Car);