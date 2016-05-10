var app = angular.module("socialNetwork");

app.service("userServices", function ($http) {

	var users = [];

	this.getAll = function (cb) {
		$http.get("/users").success(function (output) {
			cb(output);
		})
	}

	this.create = function (user, cb) {
		$http.post("/user", { user: user }).success(function (output) {
			cb(output);
		})
	}

	this.getOneUser = function (username, cb) {
		$http.get("/user/" + username).success(function (output) {
			cb(output);
		})
	}

	this.update = function (obj, id, cb) {
		console.log(obj, id, cb)
		$http.put("/user/" + id, { card: obj }).success(function (output) {
			cb(output);
		})
	}

	this.remove = function (id, cb) {
		$http.delete("/user/" + id).success(function () {
			cb();
		})
	}

})