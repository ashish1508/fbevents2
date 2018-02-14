var myevents = angular.module('myevnt',[]);
myevents.controller('myeventcontrol',['$scope','$http',function($scope,$http){
	$scope.message = "welcome to my events";
	$http.get('/api/getmyevents').then(function(res){
		console.log(res.data);
		console.log(typeof(res.data[0].events[0].sdate));
		$scope.details = res.data[0].events;
		$scope.dat = res.data[0].events[1].sdate;
		console.log($scope.dat);
		var d = new Date($scope.dat);
		console.log(d.getDate());
		console.log(d.getMonth());
		console.log(d.getFullYear())
	})

}])