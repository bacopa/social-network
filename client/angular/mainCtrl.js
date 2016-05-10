var app = angular.module("socialNetwork");

app.controller("mainCtrl", function ($scope, $stateParams, userServices) {

	//get the users
	$scope.users = [];

	
	userServices.getAll(function (data) {
		$scope.users = data;
	})
	





})