require('./models/Users');
require('./services/passport');

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

mongoose.connect(keys.mongoURI);
const app = express();
// process.env.PORT is used because if we are deploying to Heroku we will set the process.env.PORT
// from Heroku.  Otherwise if we aren't deployed to some other environment, we will use the 5000 port.
const PORT = process.env.PORT || 5000;
/*
 Order should
 1 - express app startup
 2 - cookie session // and any other middleware needed
 3 - passport initialize
 4 - passport session
 5 - Routes
 */
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());

app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(PORT);