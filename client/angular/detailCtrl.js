var app = angular.module("socialNetwork");

app.controller("detailCtrl", function ($scope, $state, userServices) {

	
	var username = $state.params.username;
	
	userServices.getOneUser(username, function (data) {
		$scope.user = data;
	})
	





})