const passport = require('passport');

module.exports = (app) => {
    //OAuth login
    app.get('/auth/google',
        //telling passport to use the 'google' strategy and inside scope have the profile and email info
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    //OAuth callback after user logged in which returns a code that passport will use
    app.get('/auth/google/callback', passport.authenticate('google'));
    //Testing to see if the cookie is saved when a user is logged in, the req object has .user appended by passport
    app.get('/api/current_user',function(req,res){
       res.send(req.user);
    });
    //Logging out of the current user using the passport logout() function appended to req objectnode
    app.get('/api/logout',function(req,res){
       req.logout();
       res.send(req.user);
    });
};