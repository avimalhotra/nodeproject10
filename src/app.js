require("dotenv").config();
const express=require("express");
const app=express();
const path=require('path');
const nunjucks=require("nunjucks");
nunjucks.configure('views', { autoescape: true });
const session=require("express-session");
const bodyParser=require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  

app.set('trust proxy', 1); 

app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser( (user, done)=>{
    done(null, user);
});

passport.deserializeUser( (user, next)=>{
    next(null, user);
});



const db=require("./dao");
const [car,pin,user]=require('./model/index');
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



/* passport */
passport.use('local', new LocalStrategy(( username, password, done) => {
        
        
    user.find({ name: username }).then(user=>{      
        
        if( user.length==0 ){
            return done(null, null, { message: 'No user found!' });
        }
        else  if (user[0].password !== password) {
            return done(null, null, { message: 'Password is incorrect!' });
        }
        else{
            return done(null, user, null);
        }
      })
  }
));

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
}


app.get("/",(req,res)=>{
    res.status(200).render("index.html",{ title:"nunjucks", car:{name:"swift", power:82, torque: 112}, cars:["swift","i20","polo","baleno"], hybrid:true  });
});


app.get("/login",(req,res)=>{
    res.status(200).render("login.html",{ title:"Login Page" });
});

app.get("/admin", isAuthenticated, (req,res)=>{
    res.status(200).render("admin.html",{ title:"Admin Page" });
});
app.get('/logout', (req, res) => { 
    if (req.session) {
        req.session.destroy((err)=> {
          if(err) {
            return next(err);
          } else {
              res.clearCookie('connect.sid');
              req.logout({},()=>{
                console.log("logout");
              });
              if (!req.user) { 
                  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
              }
              res.render('login.html',{ msg:"Logout Successfully"});
          }
        });
      }
});

app.post("/login",(req,res)=>{
    passport.authenticate('local',  (err, user, info) =>{
        if (err) {
          res.render('login.html', { error: err });
        } 
        else if (!user) {
          res.render('login.html', { errorMessage: info.message });
        } 
        else {
          //setting users in session
          req.logIn(user, function (err) {
            if (err) {
              res.render('login.html', { error: err });
            } else {
            //   res.render('admin.html',{ name:user.name});
            res.redirect("/admin");
             }
          })
        }
      })(req, res);
});


/* cars */
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