var app = angular.module("socialNetwork");

app.controller("loginRegisterCtrl", function ($scope, userServices, $stateParams, $auth) {


	$scope.authenticate = provider => {
		$auth.authenticate(provider);
	}

	$scope.isAuthenticated = () => {
		return $auth.isAuthenticated()
	}

	$scope.register = function () {
		userServices.create($scope.newUser, function () {
			 
		});
	}

	$scope.login = function () {
		//get user's bcrypted password based on email
		//bcrypt.compare
	}

})
