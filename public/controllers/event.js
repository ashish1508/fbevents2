var event = angular.module('evnt',[]);


event.controller('eventcontrol',['$scope','$http',function($scope,$http){

		$scope.item="ashish";
		$http.get('/api/getevents').then(function(res){
			console.log(res.data);
			$scope.details = res.data;
		})
  		
}])