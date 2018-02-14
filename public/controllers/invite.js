var invevent = angular.module('invevnt',[]);
invevent.controller('invitecontrol',['$scope','$http',function($scope,$http){
	$http.get('/api/invite').then(function(res){
		console.log(res.data[0].invited);
		$scope.details = res.data[0].invited;
	})
}])