const db=require("../dao");
const [car,pin]=require('../model/index');

module.exports=(req,res)=>{
    car.find({}).then(i=>{
        res.status(200).render("cars.html",{ title:"About Us", data: i });
    }).catch(e=>{
        res.status(200).render("cars.html",{ title:"About Us", data:[{res:"no data"}] });
    });
};