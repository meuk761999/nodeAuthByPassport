const express = require('express');
const app = express();
const PORT = process.env.PORT||3001;
const expressLayouts = require('express-ejs-layouts');
const dbXtring = require('./config/keys').MongoURI;
const mongoose = require('mongoose');
const UserModel=require("./model/User");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// const { use } = require('passport');
require('./config/passport')(passport);
mongoose.connect(dbXtring,{useNewUrlParser:true})
.then(()=>
{
    console.log('mongodb connected');
})
.catch((error)=>
{
    console.log(error.message);
})
app.use(expressLayouts);
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}));

app.use(passport.initialize());
app.use(passport.session());
//to use flash messaging(messages shown as a prompt or notification after redirect)
app.use(flash());
app.use((req,res,next)=>
{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})
app.use('/users',require('./routes/users.js'));

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})