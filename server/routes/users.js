const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// views Routes
router.get('/welcome',(req,res)=> res.render("welcome"));
router.get('/register',(req,res)=>res.render("register",{
    success_msg:'',
    error_msg:''
}));
router.get('/login',(req,res)=>res.render("login",{
}));
// router.get('/dashboard',(req,res)=> res.render('dashboard'));
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
                const status = await User.create({name:name ,email:email,password:hash});
                if(status)
                {
                    req.flash('success_msg','You are now registered and can login now.');
                    res.redirect("login");
                }
                }))
              
            }
            
        }
      

    } catch (error) {
        console.log(error.message);
    }
})

router.post('/login',(req,res,next)=>
{
    passport.authenticate('local',{
        successRedirect:'/users/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next)

});


module.exports=router