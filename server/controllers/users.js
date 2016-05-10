var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var User = mongoose.model("User");

module.exports = (function () {
	return {

		getAll: function (req, res) {
			console.log("server side getAll!");
			User.find({}, function (err, data) {
				if(err) {console.log(err)}
				else { 
					console.log(data);
					res.send(data);
				}
			})
		},

		create: function (req, res) {
			console.log(req.body.user)
			var newUser = new User({
				username: req.body.user.username,
				password: req.body.user.password
			});
			newUser.save(function (err, data) {
				if(err){console.log("Error while saving User...=(:", err)}
				else {
					
					res.send(data);
				}
			})
		},

		update: function (req, res) {
		console.log("UPDATE req.body", req.body)	
			User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function (err, updatedUser) {
					if(err) {
						res.status(400).send(err);
					} else {
						res.send(updatedUser);
					}

			})

		},

		remove: function (req, res) {
			console.log("deleted" + req.params.id)
			User.findByIdAndRemove(req.params.id, function (err) {
					if(err) {
						res.status(400).send(err);
					} else {
						res.send();
					}
			})
		},

		getOne: function (req, res) {
			User.findOne({username: req.params.username}, function (err, found) {
				if(err) {
					res.status(400).send(err);
				} else {
					res.send(found);
				}
			})
		}
	}
})();