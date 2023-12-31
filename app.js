const express=require('express')
const mysql=require('mysql')
const flash=require('express-flash')
const app=express()
const cors=require('cors')
const session=require('express-session')
const methodOverride=require('method-override')
const path=require('path')
const bodyParser=require('body-parser')
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
////database connection
//connection to my database
///trying to uppdate mt dtabase
/*
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"details"
  });


  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  })*/


  //end connection



app.use(express.static(path.join(__dirname,'views')))
const bcrypt=require('bcrypt')
const passport=require('passport')
const initializePassport=require('./passport')
const { doesNotThrow } = require('assert')
const { error } = require('console')
initializePassport(passport,
    email=>users.find(user=>user.email===email),
    id=>users.find(user=>user.id===id)
    )
const users=[]
app.use(cors())
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.set('view-engine','ejs')
app.use(flash())
app.use(express.urlencoded({extended:'false'}))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
//routers
app.get('/',CheckAuthenticated,(req,res)=>{
    res.render('index.ejs')
})
app.get('/login',CheckNotAuthenticated,(req,res)=>{
    res.render('login.ejs')
})
app.get('/about',CheckAuthenticated,(req,res)=>{
        res.render("about.ejs")
    })
    app.get('/contact',CheckAuthenticated,(req,res)=>{
        res.render("contact.ejs")
    })


app.get('/terms',(req,res)=>{
    res.render('learn.ejs')

})
app.get('/jobs',(req,res)=>{
    res.render('jobs.ejs')

})
app.get('/regester',CheckNotAuthenticated,(req,res)=>{
    res.render('regester.ejs')
})
//rotersdone


//post to an object array

app.post('/regester',CheckNotAuthenticated,async(req,res)=>{
    try{
        const hashedpassword=await bcrypt.hash(req.body.password,10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            password:hashedpassword
        })
        res.redirect('/login')
    }
    catch{
        res.redirect('regester')
    }
          console.log(users)
})
app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}

))
app.delete('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect('/login');
     });
})
function CheckAuthenticated(req,res,next){
    if(req.isAuthenticated()){
       return next()
    }
    res.redirect('/login')
}
function CheckNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
       return res.redirect('/')
    }
next()
};
app.listen(5050,()=>{
    console.log("listening to port 5050........")
})

