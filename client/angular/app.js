var app = angular.module("socialNetwork", ["ui.router", "satellizer"]);


app.config(function ($urlRouterProvider, $stateProvider, $authProvider) {

	$authProvider.github({
		clientId: "8db82e010bf7cde7e11d"
	});

	$stateProvider
	.state("loginRegister", {
		url: "/",
		templateUrl: "/partials/loginRegister.html",
		controller: "loginRegisterCtrl"
	})
	.state("main", {
		url: "/users",
		templateUrl: "/partials/main.html",
		controller: "mainCtrl"
	})	
	.state("detail", {
		url: "/user/:username",
		templateUrl: "/partials/detail.html",
		controller: "detailCtrl"
	})
	$urlRouterProvider.otherwise("/");
})