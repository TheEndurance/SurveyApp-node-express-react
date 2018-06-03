const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const User = mongoose.model('users');


//Converts the user mongoose model object to a cookie with the user.id stored as a string
passport.serializeUser((user,done)=>{
   done(null,user.id);
});

//Gets the user.id from the cookie and finds that id in mongoDB and returns the user model object
passport.deserializeUser((id,done)=>{
   User.findById(id)
       .then((user)=>{
           done(null,user);
       });
});

//Tells passport what strategy to use (like google or facebook or etc)
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID, //passport requires the clientID and clientSecret for OAuth flow
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback', //this is the callback URL that is defined when creating a login API on google+ API page
            proxy:true
        },
        (accessToken,refreshToken,profile,done)=> { //When a user logs in through google OAuth then we try to find them in our MongoDB
            User.findOne({googleId:profile.id}).then((existingUser)=>{
                   if (existingUser){
                        done(null,existingUser);
                   } else {
                       new User({googleId: profile.id}).save().then((user)=>{
                           done(null,user);
                       });
                   }
                });
        }
    )
);