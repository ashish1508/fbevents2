var signup = angular.module('signup',[]);
signup.controller('signupcontrol',['$scope','$http','$window',function($scope,$http,$window){
	$scope.use ={};
	
	$scope.signup = function(){
		$http.post('/signup',$scope.use)
	
	}
}])
