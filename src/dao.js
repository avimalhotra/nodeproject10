const mongoose = require('mongoose');

const db=mongoose.connection;

const Schema=mongoose.Schema;
const Car=new Schema({
    _id:mongoose.ObjectId,
    name:{type:String,required:true, unique:true, dropDups:true},
    type:{type:String,required:true, unique:true},
    price:{type:Number,required:true, unique:true, min:400000, max:5000000},
    fuel:{type:String,required:true, unique:true}
},{collection:"cars"});

const model=mongoose.model("cars",Car);

let car=new model(
    {
        _id:new mongoose.Types.ObjectId(),
        name:"fronx",
        type:"hatchback",
        price:1200000,
        fuel:"petrol"
    });

/* const Pin=new Schema({
    _id:mongoose.ObjectId,
    officeName:String,
    pincode:Number,
    taluk:String,
    districtName:String,
    stateName:String,
},{collection:"pincode"});
const pin=mongoose.model("pins",Pin); */


main().catch(err => console.log(err));

 async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/node');
 // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if auth enabled
    
 // car.save().then(i=>console.log("car saved")).catch(e=>console.warn(e));

// model.find({name:"swift"}).then(i=>console.log(i)).catch(e=>console.warn(e));
// model.find({type:"suv"}).then(i=>console.log(i)).catch(e=>console.warn(e));
 model.find({name:RegExp('baleno','i')}).then(i=>console.log(i)).catch(e=>console.warn(e));
 
 console.log("Mongodb connected");
}
