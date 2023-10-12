const express = require('express');
const app = express();
const PORT = process.env.PORT||3001;
const expressLayouts = require('express-ejs-layouts');
const dbXtring = require('./config/keys').MongoURI;
// app.use(express.json());
const mongoose = require('mongoose');
const UserModel=require("./model/User");
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
app.use('/users',require('./routes/users.js'));

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})