var users = require("./../controllers/users.js");
var request = require('request');
var qs = require('querystring');
var User = require("../models/user");

module.exports = function(app) {

	app.get("/users", function (req, res) {
		users.getAll(req, res);
	});

	app.post("/user", function (req, res) {
		users.create(req, res);
	});

	app.put("/user/:username", function (req, res) {
		users.update(req, res);
	});

	app.delete("/user/:username", function (req, res) {
		users.remove(req, res);
	});

	app.get("/user/:username", function (req, res) {
		users.getOne(req, res);
	});

	app.post("/auth/github", function (req, res) {

		var accessTokenUrl = "https://github.com/login/oauth/access_token";
		var userApiUrl = "https://api.github.com/user";

		var params = {
			code: req.body.code,
			client_id: req.body.clientId,
			redirect_uri: req.body.redirectUri,
			client_secret: process.env.GITHUB_SECRET
		};

		request.get({ url: accessTokenUrl, qs: params }, (err, response, body) => {
			
			var accessToken = qs.parse(body);
			var headers = { "User-Agent": "satellizer"};

			request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true}, (err, response, profile) => {
				
				if(err) return res.status(400).send(err);

				User.findOne({ github: profile.id }, (err, existingUser) => {
				
				if(err) return res.status(400).send(err);

				if(existingUser) {
					var token = existingUser.makeToken();
					res.send({ token: token });

				} else {
					var user = new User();
					console.log("*********************user", user);
					user.github = profile.id;

					user.save((err, savedUser) => {

				if(err) { 
					console.log(err)
					return res.status(400).send(err);
				}

				console.log("savedUser",savedUser)

						var token = savedUser.makeToken();
						res.send({ token: token });
					});
				}
				});
			});
		});

	});
}