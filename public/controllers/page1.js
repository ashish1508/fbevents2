var page1 = angular.module('page1',[]);

page1.directive('fileModel', ['$parse', function($parse){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                })
            })
        }
    }
}])

page1.service('multipartForm', ['$http', function($http){
    this.post = function(uploadUrl, data){
        var fd = new FormData();
        for(var key in data)
            fd.append(key, data[key]);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    }
}])



page1.controller('page1control',['$scope','$http','multipartForm',function($scope,$http,multipartForm){
    
	$scope.message = "welcome to public event page";
    $scope.evnt = {};
	$scope.start = function(){
			$http.get("/api/udata/"+$scope.username).then(function(res){
			console.log(res.data);	
			if(res.data)	
			$scope.data = res.data.username;
		    else
		    $scope.data = "no user found";	

		})
		$scope.username=" ";
	}

	$scope.Submit = function(){
        console.log($scope.evnt);
        var uploadUrl = '/uploads/public/';
        multipartForm.post(uploadUrl, $scope.evnt);
        
    }



}])