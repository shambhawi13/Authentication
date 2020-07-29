// Requiring necessary npm packages
var express = require("express");
// Create a session middleware
var session = require("express-session");
// Requiring passport as we've configured it
// Passport is authentication middleware for Node
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware that makes all files available under public folder available.
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
// Create a session which uses secret : used to sign the session ID cookie &
// resave: forces the session to be saved back to the session store, even if the session was never modified during the request
// saveUninitialized : forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// initialises the authentication module.
app.use(passport.initialize());
// deserializes user detail with respect to session id
app.use(passport.session());

// Requiring our routes.api-routes : server side api , html-routes: client side routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
