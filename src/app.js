require("dotenv").config();
const express=require("express");
const app=express();
const path=require('path');
const nunjucks=require("nunjucks");
nunjucks.configure('views', { autoescape: true });
const db=require("./dao");
const [car,pin]=require('./model/index');
const cc=require('./controller/cars.controller');

const port=process.env.PORT || 3000;

app.use(express.static(path.resolve("src/public")));

// configure
nunjucks.configure(path.resolve(__dirname,'public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

app.get("/",(req,res)=>{
    res.status(200).render("index.html",{ title:"nunjucks", car:{name:"swift", power:82, torque: 112}, cars:["swift","i20","polo","baleno"], hybrid:true  });
});

app.get("/cars",cc);
app.get("/cars/:car",(req,res)=>{
    const name=req.params.car.replaceAll("-"," ");
   
    car.find({name:RegExp(name,'i')}).then(i=>{
        res.status(200).render("car.html",{ title: i[0].name, data: i });
    }).catch(e=>{
        res.status(200).render("car.html",{ data:[{res:"error"}] });
    });

});


app.get("/contact",(req,res)=>{
    res.status(200).render("contact.html",{ title:"Contact Us" });
});


app.get("/**",(req,res)=>{
    res.status(404).render("error.html",{ title:"404" });
});


app.listen(port,()=>{
    console.log(`Server running at http://127.0.0.1:${port}`);
});