'use strict';
// require all packages
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize'); // promise based node ORM
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';// get env variable NODE_ENV if present, else set development env
var config    = require(__dirname + '/../config/config.json')[env]; // get configuration from config folder
var db        = {};

// database credentials might differ based on environment selected, so select the db config based on environment like dev, test, prod
if (config.use_env_variable) {
  // create sequelize model, creates table
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  // create sequelize model, creates table
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    // filter all .js files
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  // for each js files, create a model
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    // adding each models to db object
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    // associate each model like user model with the database object
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
