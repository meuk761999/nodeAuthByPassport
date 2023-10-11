const express = require('express');
const router = express.Router();
// Routes
router.get('/login',(req,res)=> res.send("Welcome to the login page"));
router.get('/register',(req,res)=>res.send("Welcome to the register page"));



module.exports=router