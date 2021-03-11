// Code goes here
var app_demo = angular.module("appName", ["ui.router"]);
// CUSTOM FILTER
app_demo.filter("titlecase", function () {
	return function (input) {
		return angular.isString(input) && input.length > 0
			? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase()
			: input;
	};
});

app_demo.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("/index", {
			url: "/index",
			abstract: true,
			views: {
				"": {
					templateUrl: "views/_list.html",
				},
			},
		})
		.state("home", {
			url: "/home",
			views: {
				"": {
					templateUrl: "views/_home.html",
				},
			},
			controller: "homeCtrl",
		})
		.state("list", {
			url: "/list",
			controller: "listCtrl",
			templateUrl: "views/_list.html",
		})
		.state("about", {
			url: "/about",
			templateUrl: "views/_about.html",
			controller: "aboutCtrl",
		})
		.state("contact", {
			url: "/contact",
			templateUrl: "views/_contact.html",
			controller: "contactCtrl",
		})
		.state("landing", {
			url: "/landing",
			templateUrl: "views/_landingpage.html",
			controller: "landingCtrl",
		})
		.state("testpage", {
			url: "/testpage",
			templateUrl: "views/_testpage.html",
			controller: "testpageCtrl",
		})
		.state("error", {
			url: "/error",
			templateUrl: "views/_error_page.html",
			controller: "errorCtrl",
		});
	$urlRouterProvider.otherwise("/error");
	// $urlRouterProvider.otherwise("/list/home");
});

app_demo.controller("homeCtrl", function ($scope) {
	$scope.app_name = "AngularJS App";
	$scope.year = "2021";
	$scope.signedInContent = "Signed in as Ayoub Khan";
	$scope.rgbRed = 0;
	$scope.rgbGreen = 200;
	$scope.rgbBlue = 0;
	$scope.navbar_links = [
		{ name: "home", link: "home" },
		{ name: "about", link: "about" },
		{ name: "contact", link: "contact" },
		{ name: "list", link: "list" },
		{ name: "landing", link: "landing" },
		{ name: "testpage", link: "testpage" },
	];
	$scope.changeNgStatus = function () {
		// alert("Iram Alya");
		$scope.name = "Iram Alya";
	};
});
app_demo.controller("aboutCtrl", function ($scope) {
	$scope.contentLoaded = false;
	$scope.changeContentLoadedStatus = function () {
		if ($scope.contentLoaded == false) {
			$scope.contentLoaded = true;
		} else {
			$scope.contentLoaded = false;
		}
	};
	$scope.names = ["Hafiz Ayoub", "Ayoub Khan", "Ibrahim", "Salman"];
	$scope.persons = [
		{
			id: "1",
			name: "ayoub",
			email: "ayoub@gmail.com",
		},
		{
			id: "2",
			name: "ibrahim",
			email: "ibrahim@gmail.com",
		},
		{
			id: "3",
			name: "Khan",
			email: "Khan@outlook.com",
		},
		{
			id: "4",
			name: "Sana",
			email: "Sana@gmail.com",
		},
	];
});
app_demo.controller("contactCtrl", function ($scope) {
	$scope.options = ["Emil", "Tobias", "Linus"];
	$scope.selectedName = "Tobias";
});
app_demo.controller("listCtrl", function ($scope) {
	$scope.rgbRed = 0;
	$scope.rgbGreen = 200;
	$scope.rgbBlue = 0;
	$scope.showMessage = function (msg) {
		alert(msg);
	};
});
app_demo.controller("landingCtrl", function ($scope, $http) {
	$scope.pricing_table = [
		{
			id: "1",
			name: "free",
			packages: {
				price: "0",
				currency: "$",
				period: "month",
			},
			features: [
				"10 users included",
				"2 GB of storage",
				"Email support",
				"Help center access",
			],
			text: "sign up",
		},
		{
			id: "2",
			name: "pro",
			packages: {
				price: "5",
				currency: "$",
				period: "year",
			},
			features: [
				"15 users included",
				"5 GB of storage",
				"Priority email support",
				"Help center access",
			],
			text: "get started",
		},
		{
			id: "3",
			name: "enterprise",
			packages: {
				price: "15",
				currency: "$",
				period: "month",
			},
			features: [
				"25 users included",
				"15 GB of storage",
				"Priority email support",
				"Help center access",
			],
			text: "contact us",
		},
	];
	$scope.users_loaded = false;
	$scope.page = 1;
	$scope.per_page = 10;
	$http
		.get(`https://reqres.in/api/users?per_page=${$scope.per_page}`)
		.then(function (json) {
			$scope.users = json.data.data;
			$scope.users_loaded = true;
		});
	$scope.gotoPage = function (pageNo) {
		$scope.users_loaded = false;
		if (pageNo == "next") {
			$scope.page = $scope.page + 1;
		} else if (pageNo == "prev") {
			$scope.page = $scope.page - 1;
		} else {
			$scope.page = pageNo;
		}
		$scope.getData($scope.page);
	};
	$scope.getData = function (pageNo) {
		$http
			.get(
				`https://reqres.in/api/users?per_page=${$scope.per_page}&page=${pageNo}`
			)
			.then(function (json) {
				$scope.users = [];
				$scope.users = json.data.data;
				$scope.users_loaded = true;
			});
	};
});
app_demo.controller("testpageCtrl", function ($scope) {
	$scope.friends = [
		{
			name: "John",
			age: 25,
			gender: "boy",
			info:
				"ABc In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
		},
		{
			name: "Jessie",
			age: 30,
			gender: "girl",
			info:
				"A In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. L used as a placeholder before final copy is available. Wikipedia",
		},
		{
			name: "Johanna",
			age: 28,
			gender: "girl",
			info:
				"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
		},
		{
			name: "Joy",
			age: 15,
			gender: "girl",
			info:
				"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface withoutaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
		},
		{
			name: "Mary",
			age: 28,
			gender: "girl",
			info:
				"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
		},
		{
			name: "Peter",
			age: 95,
			gender: "boy",
			info:
				"publishing In  and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful coceholder before final copy is available. Wikipedia",
		},
		{
			name: "Sebastian",
			age: 50,
			gender: "boy",
			info:
				"Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
		},
		{
			name: "Erika",
			age: 27,
			gender: "girl",
			info:
				"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
		},
		{
			name: "Patrick",
			age: 40,
			gender: "boy",
			info:
				"Design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
		},
		{
			name: "Samantha",
			age: 60,
			gender: "girl",
			info:
				"Publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
		},
	];
	$scope.price_table = [
		{
			college: "Maturi",
			location: "venkata subbarao engg college",
			pincode: 76003,
		},
		{
			college: "Nadergul",
			location: "Hyderabad,Telangana",
			pincode: 501510,
		},
		{
			college: "Nadergul",
			location: "Hyderabad,Telangana",
			pincode: 501510,
		},
	];
});
app_demo.controller("errorCtrl", function () {});
