var mongoose = require("mongoose");
var moment = require('moment');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({

	username: {type: String, unique: true},
	password: {type: String},
	about: {type:String},
	links: {type: String},
	favorites: {type: String},
	github: String
});

userSchema.methods.makeToken = function() {
  var token = jwt.sign({
    _id: this._id,
    exp: moment().add(1, 'day').unix() // in seconds
  }, JWT_SECRET);
  return token;
};


var User = mongoose.model("User", userSchema);

module.exports = User;