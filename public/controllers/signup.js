var signup = angular.module('signup',[]);
signup.controller('signupcontrol',['$scope','$http','$window',function($scope,$http,$window){
	$scope.use ={};
	
	$scope.signup = function(){
		$http.post('/signup',$scope.use).when(function(res){
			console.log("success");
			$window.location.href = 'https://gentle-plains-65118/login';
		},function(err){
			console.log(err);
		})
	
	}
}])
