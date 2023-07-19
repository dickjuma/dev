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
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"details"
  });


  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  })


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


const help=[]
app.post('/contact',(req,res)=>{
    help.push({
        name:req.body.names,
Email:req.body.emails,
message:req.body.text
    })
    con.query("INSERT INTO message(name,email,message) VALUES ('"+req.body.names+"','"+req.body.emails+"','"+req.body.text+"')",function(err, result)
{
  if (err)
     throw err;
     console.log('message added')
}
);
    console.log(help)
    res.redirect('/')

})
         //res.redirect('/login')
        /* con.query("SELECT Email FROM users WHERE Email=?",[email],(error,data)=>{
if(error) throw error;
if(result >0)
console.log('email taken')
else{*/
//failed update

          //update inputs to deatails database**juma
con.query("INSERT INTO users(Username,Email,Phonenumber,password) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.number+"','"+hashedpassword+"')",function(err, result)
{
  if (err)
     throw err;
     console.log('database updated')
}
);
/*const email=req.body.email
con.query("SELECT COUNT(*) AS cnt FROM users WHERE Email = ? " ,
[email] , function(err , data){
   if(err){
       console.log(err);
   }
   else{
       if(data[0].cnt > 0){
        res.status(500).send('email taken try to log in ')     // Already exist
       }else{
        con.query("INSERT INTO users(Username,Email,Phonenumber,password) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.number+"','"+hashedpassword+"')",function(err, result)
        {
          if (err)
             throw err;
             console.log('database updated')
        })
       }
   }
})*/
res.redirect('/login')
    }

    catch{
res.redirect('/regester')
    }
    console.log(users)
})
app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}
)


)
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
}


app.listen(5050,()=>{
    console.log("listening to port 5050........")
})







