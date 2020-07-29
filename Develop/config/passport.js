var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  // use username to authenticate user
  {
    usernameField: "email"
  },
  // callback function that should return done
  function(email, password, done) {
    // When a user tries to sign in this code runs
    // sequalize method findOne which is select query method
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        // second parameter to done method is false if user enters incorrect credential.
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        // second parameter to done method is false if user enters incorrect credential.
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
// determines which data of the user object should be stored in the session
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

// The user id (provided as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
