const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { render } = require('ejs');

module.exports=(passport)=>
{
    passport.use(new LocalStrategy({usernameField:'email'},async (email,password,done)=>
    {
        //Match User
        const user = await User.findOne({email:email});
        if(!user)
        {
            return done(null,false,{message:'Email does not exist'});
        }
        else
        {
            //Match password
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch)
                return done(null,user)
                else
                return done(null,false,{message:'Password does not match'});
            });
        }
    }))
    passport.serializeUser((user, done)=> {
        done(null,user.id);
      });
      
      passport.deserializeUser( async  (id, done)=> {
        const check = await User.findById(id)
        done ('{message:"Successfully logged in"}');
    

      });  
}