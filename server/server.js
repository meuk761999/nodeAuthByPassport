const express = require('express');
const app = express();
const PORT = process.env.PORT||3001;
const expressLayouts = require('express-ejs-layouts');
app.use(express.json());
const mongoose = require('mongoose');
const userModel=require("./model/schema");
mongoose.connect('mongodb://127.0.0.1:27017/mydbe')
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

app.use('/users',require('./routes/index.js'));

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})