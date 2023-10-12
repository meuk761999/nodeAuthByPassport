const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// views Routes
router.get('/login',(req,res)=> res.render("welcome"));
router.get('/register',(req,res)=>res.render("register"));
//controller Routes
const User = require('../model/User');
router.post("/register",async (req,res)=>{
    try {
        console.log("L-8---------->inside register post");
        const {name, email, password, password2}=req.body;
        let errors = [];
        if(!name || !email ||!password|| !password2)
        errors.push({msg:"All field are required"});
        if(password!==password2)
        errors.push({msg:"Passwords do not match"});
        if(password.length<8)
        errors.push({msg:"Password must be at least 8 characters"});
        if(errors.length)
        {
            console.log("L-22---------->inside register post");
            res.render('register',
            {
                errors,
                name,
                email,
                password,
                password2
            })
        }
        else
        {
            console.log("L-22---------->inside register post");
            const check= await User.findOne({email:email});
            if(check)
            {
                errors.push({msg:"Email already register please use a different email address"});
                res.render('register',
                {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            
            else
            {
                bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(password,salt,async (err,hash)=>
                {
                    if(err) throw err;
                console.log("hashPassword",hash)
                console.log("L-55---------->inside register post");
                const status = await User.create({name:name ,email:email,password:hash});
                if(status)
                {
                    res.redirect("login");
                }
                }))
              
            }
            
        }
      

    } catch (error) {
        console.log(error.message);
    }
})



module.exports=router