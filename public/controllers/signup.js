var signup = angular.module('signup',[]);
signup.controller('signupcontrol',['$scope','$http',function($scope,$http){
	$scope.use ={};
	
	$scope.signup = function(){
		$http.post('/signup',$scope.use).when(function(res){
			console.log("success");
		})
	}
}])