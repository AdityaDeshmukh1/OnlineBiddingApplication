// backend/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use('local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' }, 
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
